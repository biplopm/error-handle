import express from "express";
import {userMulter} from "../utils/multer.js"
import {loginUser,logoutUser} from "../controllers/authControllers.js"


//initial Route
const router = express.Router();

//Route setup
router.get("/logout", logoutUser);
router.post("/login",userMulter, loginUser);


//export Route
export default router;
