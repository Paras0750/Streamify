import multer, { diskStorage } from "multer";
import { join, extname } from "path";
import { existsSync, mkdirSync } from "fs";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomeFile extends Express.Multer.File {
  fieldname: string;
}
export interface CustomRequest extends Request {
  user?: string | JwtPayload | undefined;
}
const storage = diskStorage({
  destination: (req: Request, file: CustomeFile, cb) => {
    console.log("Recieved file");
    var uploadPath = join(__dirname, "../../mainServer/S3Bucket/");

    if (file.fieldname === "video") {
      uploadPath = join(__dirname, "../../mainServer/S3Bucket/Videos/");
    }
    if (file.fieldname === "thumbnail") {
      uploadPath = join(__dirname, "../../mainServer/S3Bucket/Thumbnails/");
    }

    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req: CustomRequest, file: CustomeFile, cb) => {
    const ext = extname(file.originalname);
    //@ts-ignore
    cb(null, `${req?.user?.username}-${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    // fileSize: 1024 * 1024 * 500, // 500 MB
  },
});

export default upload;
