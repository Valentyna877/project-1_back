import { celebrate } from "celebrate";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post("/register", celebrate(registerSchema), registerUser);
router.post("/login", celebrate(loginSchema), loginUser);
router.post("/logout", authenticate, logoutUser);
router.post("/refresh", refreshUser);

export default router;
