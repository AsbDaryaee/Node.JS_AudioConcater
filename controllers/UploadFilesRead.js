
const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const errorHandler = require("../errorHandler/errorHandler");
const EventEmitter = require("events");

// Create a custom event emitter for file reading
class FileReadEmitter extends EventEmitter {}
const fileReadEmitter = new FileReadEmitter();

const UploadFilesRead = asyncHandler(async (req, res, next) => {
  try {
    // Read the contents of the "imports" directory and create an array of file information objects
    await fs.readdir(path.join(__dirname, "/../files/imports"), (err, data) => {
      if (err) {
        console.log(err);
        return fileReadEmitter.emit("error", err.message);
      }
      var array = [];
      data.forEach((item, index) => {
        array.push({
          fileAdress: __dirname + "/../files/imports/" + item,
          fileName: path.basename(item, ".mp3"),
          status: "آپلود شد", // the value of status property doesn't seem correct. I left it as-is based on the original code.
        });
      });
      // Write the file information array to a JSON file
      fs.writeFile("./public/data.json", JSON.stringify(array), (err) => {
        if (err) {
          console.log(err);
          return fileReadEmitter.emit("error", err.message);
        }
        console.log("*** JSON Updated");
        fileReadEmitter.emit("success", "JSON Updated");
        next();
      });
    });
  } catch (error) {
    console.log(error);
    errorHandler(500, error.message, res);
    fileReadEmitter.emit("error", error.message);
  }
});

module.exports = { UploadFilesRead, fileReadEmitter };
