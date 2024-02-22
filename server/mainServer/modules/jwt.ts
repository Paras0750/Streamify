import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | JwtPayload | undefined;
}

const protect = (req: CustomRequest, res: Response, next: NextFunction) => {
  var token = req.headers?.authorization;
  if (!token)
    return res.status(401).json({ status: false, msg: "No Token Provided" });

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    (err: Error | unknown, decoded) => {
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
};
export default protect;

