const errorHandler = require("../errorHandler/errorHandler");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const {
  promisify
} = require("util");
const probe = require("node-ffprobe");
const audioconcat = require("audioconcat");
const {
  exec
} = require("child_process");
const EventEmitter = require("events");

// Create a custom event emitter for audio file processing
class AudioProcessEmitter extends EventEmitter {}
const audioProcessEmitter = new AudioProcessEmitter();

const AnnounceFile = asyncHandler(async (req, res, next) => {
  async function addAnnouncement() {
    try {
      const data = await promisify(fs.readFile)("./public/data.json", "utf-8");
      const updateArray = [];

      // loop through each item in the JSON data
      await Promise.all(
        JSON.parse(data).map(async (item, index) => {
          try {
            // get audio samplerate using ffprobe
            const probeData = await probe(item.fileAdress);
            const sampleRate = probeData.streams[0].sample_rate;
            const bitRate = probeData.streams[0].bit_rate;

            // check audio sample rate and set announcement file accordingly
            let announcementFile;
            switch (sampleRate) {
              case "8000":
                announcementFile = __dirname + "/../anonce/8000.mp3";
                break;
              case "11025":
                announcementFile = __dirname + "/../anonce/11025.mp3";
                break;
              case "16000":
                announcementFile = __dirname + "/../anonce/16000.mp3";
                break;
              case "22050":
                announcementFile = __dirname + "/../anonce/22050.mp3";
                break;
              case "32000":
                announcementFile = __dirname + "/../anonce/32000.mp3";
                break;
              case "44100":
                announcementFile = __dirname + "/../anonce/44100.mp3";
                break;
              case "48000":
                announcementFile = __dirname + "/../anonce/48000.mp3";
                break;
              default:
                announcementFile = __dirname + "/../anonce/8000.mp3";
                console.log("the sample rate of audio is :" + sampleRate);
                break;
            }

            // set input and output file paths
            const inputFile =
              __dirname + "/../files/imports/" + item.fileName + ".mp3";
            const outputFile =
              __dirname +
              "/../files/notReady/" +
              index +
              item.fileName +
              ".mp3";

            // check if the bitrate is less than 128000 and convert if necessary
            if (bitRate < 128000) {
              console.log("is smaller_______________`");
              await promisify(exec)(
                `ffmpeg -i ${JSON.stringify(
                  inputFile
                                  )} -b:v 2M -b:a 128k ${JSON.stringify(
                                    outputFile
                                  )}`
              );
              console.log("*/**********/*//*/*****************************" + outputFile);
            }

            // concatenate audio files using audioconcat module
            await audioconcat([inputFile, announcementFile])
              .concat(outputFile)
              .on("start", function (command) {})
              .on("error", function (err, stdout, stderr) {
                console.error("Error:", err);
                console.error("ffmpeg stderr:", stderr);
                audioProcessEmitter.emit("error", err.message);
              })
              .on("end", async function () {
                // console.error("Audio created in:", outputFile);



                // add ID3v2 tags to output file using ffmpeg and update array
                await promisify(exec)(
                  `ffmpeg -i ${JSON.stringify(
                    outputFile
                  )} -c copy -id3v2_version 3 ${JSON.stringify(
                    __dirname +
                      "/../files/exports/" +
                      item.fileName +
                      " - " +
                      Math.floor(Math.random() * 10000) +
                      " - " +
                      "Announced" +
                      ".mp3"
                  )}`
                );
                fs.unlinkSync(item.fileAdress);
                updateArray.push({
                  fileAdress: item.fileAdress,
                  fileName: item.fileName,
                  status: "آماده",
                });
                fs.writeFileSync(
                  "./public/update.json",
                  JSON.stringify(updateArray)
                );
                audioProcessEmitter.emit(
                  "success",
                  "***** Audio processing complete"
                );
              });
          } catch (err) {
            console.error("Error adding announcement to audio file:", err);
            audioProcessEmitter.emit("error", err.message);
          }
        })
      );
      audioProcessEmitter.emit(
        "success",
        "**** Add announcement to all audio files complete"
      );
    } catch (err) {
      console.error("Error reading data file:", err);
      audioProcessEmitter.emit("error", err.message);
    }
  }

  // add event listeners for audio processing events
  audioProcessEmitter.on("success", (message) => {
    console.log(message);
  });

  audioProcessEmitter.on("error", (errorMessage) => {
    console.log(errorMessage);
  });

  try {
    await addAnnouncement();
    setInterval(() => {
      res
        .status(200)
        .sendFile(
          path.join(__dirname, "../public/views/final.html"),
          function (err) {
            if (err) {
              res.status(err.status).end;
            }
          }
        );
    }, 5000);
  } catch (err) {
    errorHandler(err, req, res, next);
  }
});

module.exports = AnnounceFile;