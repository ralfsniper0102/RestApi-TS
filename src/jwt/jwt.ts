import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

const secret = process.env.JWT_SECRET as string;

const sign = (payload: { id: number; email: string }) => {
  const jwtConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, jwtConfig);
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json();

    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json();
    }
    res.locals.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export { sign, verifyToken };
