import express from "express";
// import uerAuth from "../middlewares/authMiddleware";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// router object
const router = express.Router();

// routes
// Get users || GET

router.put("/update-user", updateUserController);
export default router;
