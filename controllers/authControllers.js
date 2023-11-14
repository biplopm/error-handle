import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

/**
 * @DESC User Login System
 * @ROUTE /api/v1/login
 * @METHOD POST
 * @ACESS Public
 */

export const loginUser = asyncHandler(async (req, res) => {
  //Get Params
  const { email, password } = req.body;

  //Validate Check
  if (!email || !password) {
    return res.status(400).json({ msg: "All Input Field Filled Are Required" });
  }
  //User Check
  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    return res.status(404).json({ msg: "Invalid Email Address" });
  }

  //Password Validate
  const passCheck = await bcrypt.compare(password, loginUser.password);
  if (!passCheck) {
    return res.status(400).json({ msg: "Invalid Password" });
  }

  // Access Token
  const accessToken = jwt.sign(
    { email: loginUser.email },
    process.env.JWT_SCERET,
    {
      expiresIn: "10d",
    }
  );

  //Set Cookie Token

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV === "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 604800000,
  });

  res.status(200).json({
    msg: `Hello ${loginUser.name}, You are Login`,
    user: loginUser,
    token: accessToken,
  });
});

/**
 * @DESC User Logout System
 * @ROUTE /api/v1/logout
 * @METHOD GET
 * @ACESS Public
 */

export const logoutUser = asyncHandler(async (req, res) => {
  //Clear the access token Cookies in Logout
  res.clearCookie("accessToken");
  res.status(200).json({
    msg: ` You are Logout now`,
  });
});
