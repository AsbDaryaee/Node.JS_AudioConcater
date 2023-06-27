const path = require("path");
const errorHandler = require("../errorHandler/errorHandler");
const fs = require("fs");

const CleanUp = (req, res, next) => {
  console.log("<---- Fresh Start ---->");
  try {
    // Delete any files in the "notReady" directory (unclear if this is necessary without more context)
    fs.readdir(__dirname + "/../files/notReady/", (err, data) => {
      data.forEach((item, index) => {
        fs.unlinkSync(__dirname + "/../files/notReady/" + item);
      });
    });
    fs.readdir(__dirname + "/../files/imports/", (err, data) => {
      data.forEach((item, index) => {
        fs.unlinkSync(__dirname + "/../files/imports/" + item);
      });
    });
    fs.writeFileSync("./public/data.json", "[{}]");
    fs.writeFileSync("./public/update.json", "[{}]");
    console.log("* Everything Is Cleaned");
    next();
  } catch (error) {
    console.log(error);
    errorHandler("500", error.message, res);
  }
};

module.exports = CleanUp;
