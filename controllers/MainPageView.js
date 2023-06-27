const path = require("path");
const fs = require("fs");

const MainPageView = async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../index.html"));
};

module.exports = MainPageView;
