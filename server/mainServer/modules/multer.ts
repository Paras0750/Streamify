import multer from "multer";
import * as path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "../S3Bucket/");
    if (file.fieldname === "displayPic" || file.fieldname === "bannerImage") {
      uploadPath = path.join(__dirname, "../S3Bucket/ChannelImages/");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log("File: ", file);
    const ext = path.extname(file.originalname);
    // @ts-ignore
    cb(null, `${req.user.username}-${file.fieldname}${ext}`);
  },
});

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 500, // 500 MB
  // },
});

export default upload;
