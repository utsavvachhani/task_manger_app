import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/connectDB.js";

import routes from "./routes/index.routes.js";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("API running !!");
});

app.use("/api", routes);


const PORT = process.env.PORT || 3122;

connectToDB();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
