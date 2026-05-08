import { celebrate } from "celebrate";
import {
  loginSchema,
  registerSchema,
  requestResetEmailSchema,
  tokenSchema,
} from "../validations/authValidation.js";
import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
  requestResetEmail,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post("/register", celebrate(registerSchema), registerUser);
router.post("/login", celebrate(loginSchema), loginUser);
router.post("/logout", authenticate, logoutUser);
router.post("/refresh", refreshUser);
router.post(
  "/request-reset-email",
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post("/check-token", celebrate(tokenSchema));

export default router;
