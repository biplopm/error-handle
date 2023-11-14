import bcrypt from "bcrypt";
import User from "../models/User.js";
import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler"

/**
 * @DESC Get All User
 * @ROUTE /api/v1/user/
 * @METHOD GET
 * @ACESS Public
 */

export const getAllUser = asyncHandler(async (req, res) => {
  //get All Users
  const data = await User.find();

  //check user data Check
  if (data.length === 0) {
    return res.status(404).json({ msg: "User data not Found", users: [] });
  }

  res.status(200).json({ msg: "", users: data });
});

/**
 * @DESC Get Single User
 * @ROUTE /api/v1/user/:id
 * @METHOD GET
 * @ACESS Public
 */

export const getSingleUser = asyncHandler(async (req, res) => {
  //Get Params
  const { id } = req.params;

  //get All Users
  const data = await User.findById(id);

  //check user data Check
  if (!data) {
    return res.status(404).json({ msg: "User data not Found", user: null });
  }

  res.status(200).json({ msg: "", user: data });
});

/**
 * @DESC Create New User
 * @ROUTE /api/v1/user
 * @METHOD POST
 * @ACESS Public
 */

export const createUser = asyncHandler(async (req, res) => {
  //Get Params
  const { name, email, password } = req.body;

  //Validate Check
  if (!name || !email || !password) {
    return res.status(401).json({ msg: "All Input Field Filled Are Required" });
  }
  // Password Hash
  const hashPass = await bcrypt.hash(password, 10);

  //Create JWT
  const token = jwt.sign({name, email}, process.env.JWT_SCERET, {
    expiresIn : "10s",                        
  })

  //create a new user
  const data = await User.create({ name, email, password: hashPass });
  res.status(200).json({ msg: "User Create Sucessfully", users: data,token });
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @METHOD DELETE
 * @ACESS Public
 */

export const deleteUser = asyncHandler(async (req, res) => {
  //Get Params
  const { id } = req.params;

  //get All Users
  const data = await User.findByIdAndDelete(id);

  //check user data Check
  if (!data) {
    return res.status(404).json({ msg: "User data not Found", user: null });
  }

  res.status(200).json({ msg: "User data Delete Sucessfully", user: data });
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/:id
 * @METHOD PATCH
 * @ACESS Public
 */

export const updateUser = asyncHandler(async (req, res) => {
  //Get Params
  const { id } = req.params;
  const { name, email } = req.body;
 

  //Validate Check
  if (!name || !email) {
    return res.status(401).json({ msg: "All Input Field Filled Are Required" });
  }

  //Update a user
  const data = await User.findByIdAndUpdate(id, { name, email}, { new: true });
  

  res.status(200).json({ msg: "User data Update Sucessfully", user: data });
});
