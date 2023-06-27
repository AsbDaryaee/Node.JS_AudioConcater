const path = require("path");

const ResultPageView = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../public/views/result.html"));
};

module.exports = ResultPageView;
