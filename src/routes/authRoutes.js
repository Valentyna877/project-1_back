import { celebrate } from "celebrate";
import {
  changeCredsSchame,
  loginSchema,
  registerSchema,
  requestResetEmailSchema,
  tokenSchema,
} from "../validations/authValidation.js";
import { Router } from "express";
import {
  changeCreds,
  checkToken,
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
router.post("/check-token", celebrate(tokenSchema), checkToken);
router.post("/change-creds", celebrate(changeCredsSchame), changeCreds);

export default router;
