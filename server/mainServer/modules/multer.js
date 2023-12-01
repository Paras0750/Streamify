const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    var uploadPath = path.join(__dirname, '../S3Bucket/');
    // Use an absolute path for better reliability
    if (file.fieldname === "displayPic" || file.fieldname === "bannerImage") {
       uploadPath = path.join(__dirname, '../S3Bucket/ChannelImages/');
    }

    // Ensure the destination path exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log("File: ", file);
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.username}-${file.fieldname}${ext}`);
  },
});

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 500, // 500 MB
  // },
});

module.exports = upload;
