import jwt from "jsonwebtoken";
import { MESSAGES } from "./messages/index.js";

export const genrateRefreshToken = async ({ email, id }) => {
  return jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const genrateAccessToken = async ({ email, id }) => {
  const secret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ email, id }, secret, { expiresIn: "15m" });
};

export const verifyRefreshToken = async (refreshToken) => {
  try {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error(MESSAGES.REFRESH_TOKEN_EXPIRED);
  }
};
