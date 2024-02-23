import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { CustomRequest } from "./multer";

export function protect(req: CustomRequest, res: Response, next: NextFunction) {
  var token = req.headers.authorization;
  token = token?.split(" ")[1];
  if (!token)
    return res.status(401).json({ status: false, msg: "No Token Provided" });

  verify(
    token,
    process.env.JWT_SECRET || "",
    (err, decoded: string | JwtPayload | undefined) => {
      if (err) {
        console.log(err);
        return res
          .status(403)
          .json({ status: false, msg: "authorization failed" });
      }
      req.user = decoded;
      next();
    }
  );
}
