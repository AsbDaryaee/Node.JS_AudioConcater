const express = require("express");
const MainPageView = require("../controllers/MainPageView");
const ResultPageView = require("../controllers/ResultPageView");
const { UploadFile } = require("../controllers/UploadFile");
const { UploadFilesRead } = require("../controllers/UploadFilesRead");
const AnnounceFile = require("../controllers/AnnounceFile");
const CleanUp = require("../controllers/CleanUp");

const router = express.Router();

// router.get("/addAnnonce", ResultPageView);
router.get("/", CleanUp, MainPageView);
router.post("/upload", UploadFile, UploadFilesRead, AnnounceFile);
// router.post("/addAnnonce", AnnounceFile);

module.exports = router;