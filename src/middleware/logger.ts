import { RequestHandler } from "express";
import moment from "moment";

export const logger: RequestHandler = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.hostname}${req.originalUrl} : ${moment().format()}`
  );
  next();
};
