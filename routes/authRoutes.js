import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

// router object
const router = express.Router();
// REGISTER ROUTES || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

export default router;
