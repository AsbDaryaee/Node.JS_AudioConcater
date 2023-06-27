const multer = require("multer"); // Import Multer for handling file uploads
const path = require("path");
const asyncHandler = require("express-async-handler");
const errorHandler = require("../errorHandler/errorHandler");
const EventEmitter = require("events");

// Create a custom event emitter for file uploads
class FileUploadEmitter extends EventEmitter {}
const fileUploadEmitter = new FileUploadEmitter();

// Set up Multer storage and limits
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save uploaded files to the "imports" directory in the current script's directory
    cb(null, path.join(__dirname, "../files/imports"));
  },
  filename: function (req, file, cb) {
    // Convert the original file name from Latin-1 encoding to UTF-8 encoding
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    // Use the original file name as the saved file name
    cb(null, file.originalname);
  },
});

// Set up Multer for handling file uploads
const multi_upload = multer({
  storage, // Use the previously defined storage configuration
  limits: {
    // Limit file size to 200MB
    fileSize: 200 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      const err = new Error("Only .mp3 format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("file", 2000); // Allow up to 2000 files to be uploaded at once

// Middleware function for handling file uploads
const UploadFile = asyncHandler(async (req, res, next) => {
  // Use Multer to handle file uploads
  await multi_upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer errors when uploading
      fileUploadEmitter.emit("error", "Multer uploading error");
      return errorHandler(400, "Multer uploading error", res);
    } else if (err) {
      // Handle unknown errors when uploading
      if (err.name == "ExtensionError") {
        console.log(err.message);
        fileUploadEmitter.emit("error", "file format is not match");
        return errorHandler(400, "file format is not match", res);
      } else {
        console.log(`unknown uploading error: ${err.message}`);
        fileUploadEmitter.emit("error", "unknown uploading error");
        return res.status(400).send({ error: "unknown uploading error" });
      }
    } else {
      // Return a success log after the file upload is complete
      console.log("** Files Moved To Import");
      fileUploadEmitter.emit("success", "Files Moved To Import");
      next();
    }
  });
});

module.exports = { UploadFile, fileUploadEmitter }; // Export the middleware function and the custom event emitter for use in other modules
