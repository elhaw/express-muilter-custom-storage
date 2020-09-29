const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const { extname } = require("path");
require("dotenv").config();

// create express app
const app = express();
const fileFileter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb({
      success: false,
      msg: `File type isn't supported`,
    });
  }
};
//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
    format: async (req, file) =>  file.originalname.split('.')[1],
    public_id: (req, file) => file.public_id,
  },
});
const parser = multer({ storage: storage, fileFilter: fileFileter });

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/upload", parser.array("image"), function (req, res) {
  res.json(req.files);
});

app.get("/", (req, res) => {
  res.send("Hlello");
});

// start the app
const port = 3000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
