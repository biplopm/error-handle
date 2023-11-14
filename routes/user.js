import express from "express";
import {userMulter} from "../utils/multer.js"
import {verifyToken} from "../middlewares/verifyToken.js"
import {
  getAllUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userControllers.js";

//initial Route
const router = express.Router();

//Verify Token Routes
router.use(verifyToken)

//Route setup
router.get("/", getAllUser);
router.post("/", userMulter, createUser);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

//export Route
export default router;
