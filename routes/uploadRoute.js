const express = require("express");
const router = express.Router();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const imgur = require("imgur");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.use(cors());
router.use(express.static("public"));
router.use(morgan("dev"));
router.use(helmet());
router.use(express.json({ extended: false }));
router.use(express.urlencoded({ extended: true }));
router.use(upload.any());

router.post("/uploads/", async (req, res) => {
  const file = req.files[0];
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    res.json({ message: url.data.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
  } catch (error) {
    console.log("error", error);
  }
});


module.exports = router;