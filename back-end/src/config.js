import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    PUERTO: process.env.PUERTO
  },
  JWT: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES
  }
};
