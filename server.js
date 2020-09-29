const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
// create express app
const app = express();

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hlello");
});

// start the app
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
