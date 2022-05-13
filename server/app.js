const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
module.exports = app;

app.use(morgan("dev"));

app.use(express.json());

app.use(cors());

app.use("/api", require("./api"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
