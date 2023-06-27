const express = require("express");
const router = require("./router/Router");

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use("/", router);

app.listen(port, () =>
  console.log(`---- Server is listening on port: ${port}`)
);
