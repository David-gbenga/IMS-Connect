import "express-async-errors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

import { authenticateUser } from "./middleware/authMiddleware.js";
import { ensureAdminFromDB } from "./middleware/privacyAccessMan.js";

import staffRouter from "./routers/staffRouter.js";
import idearouter from "./routers/ideaRouter.js";
import authRouter from "./routers/authRouter.js";

const app = express();
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/admin", staffRouter);
app.use("/api/v1/idea", idearouter);
app.use("/api/v1/user", authRouter);

// Static Files for React App
app.use(express.static(path.join(__dirname, "Green_future_edited", "build")));

// Catch-all Route for React App
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Green_future_edited", "build", "index.html")
  );
});

// Error Handling Middleware
app.use(" * ", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: "Something went wrong" });
});

// Start the Server
const port = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
