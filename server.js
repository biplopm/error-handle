import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { mongodbConnection } from "./config/mongodb.js";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";

// init express server
const app = express();

//Environment Setup
dotenv.config();

//Port Configuration
const PORT = process.env.PORT || 1111;

//Server Listener
app.listen(PORT, () => {
  mongodbConnection();
  console.log(`listening on ${PORT}`.bgBlue.black);
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//static folder
app.use(express.static("public"));

//API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/", authRouter);

//Error Handler
app.use(errorHandler);
