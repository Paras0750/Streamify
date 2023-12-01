const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var uploadPath = path.join(__dirname, "../../mainServer/S3Bucket/");

    if (file.fieldname === "video" ) {
      uploadPath = path.join(__dirname, "../../mainServer/S3Bucket/Videos/");
    }
    if (file.fieldname === "thumbnail" ) {
      uploadPath = path.join(__dirname, "../../mainServer/S3Bucket/Thumbnails/");

    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {

        const ext = path.extname(file.originalname);

        cb(null, `${req.user.username}-${file.fieldname}-${Date.now()}${ext}`);

  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 500, // 500 MB
  },
});

module.exports = upload;