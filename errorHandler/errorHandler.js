function errorHandler(statusCode, message, res) {
  console.log("Error:", statusCode, message);
  res.status(statusCode).json({
    error: {
      code: statusCode,
      status: "Failed",
      message: message,
    },
  });
}

module.exports = errorHandler;
