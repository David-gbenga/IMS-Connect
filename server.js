import "express-async-errors"; // to display error and prevent your application from crashing simultaneusly
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { authenticateUser } from "./middleware/authMiddleware.js";
import { ensureAdminFromDB } from "./middleware/privacyAccessMan.js";
import express from "express";

const app = express();
//import morgan
import morgan from "morgan";
import mongoose from "mongoose";

//staff Router
import staffRouter from "./routers/staffRouter.js";
//idea Router
import idearouter from "./routers/ideaRouter.js";

//User Router
import authRouter from "./routers/authRouter.js";

//for moorgan, to ensure server is working fine by providing logs about request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//app.use(morgan("dev"));

app.use(express.json()); //middleware to create server

app.use(cookieParser());

app.get("/", (req, res) => {
  //test the get request
  res.send("Hello World");
});

//test the post request
app.post(
  "/api/v1/test",

  (req, res) => {
    const { name } = req.body;
    res.json({ message: "Data received", data: req.body });
  }
);

//allow express to use the staff router
app.use("/api/v1/admin", authenticateUser, ensureAdminFromDB, staffRouter); //authenticateUser,ensureAdminFromDB,

//allow express to use the idea router
app.use("/api/v1/idea", authenticateUser, idearouter); //authenticateUser,

//allow express to use the user router
app.use("/api/v1/user", authenticateUser, authRouter); //authenticateUser,

//NOT FOUND MIDDLEWARE, thlogoutRoutere star applies to all the request, i.e all the urls
app.use(" * ", (req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// ERROR MIDDLEWARE :This is triggered by complications in our exisiting request urls
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "Something went wrong" });
});

//to deduce port where server is running
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
