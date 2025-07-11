import { Response } from "express";

const setCookies = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

export default setCookies;
