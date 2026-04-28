import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";
import {
  updateUserSchema,
  updateUserGenderSchema,
} from "../validations/userValidation.js";
import {
  getUser,
  updateUser,
  updateUserAvatar,
  updateUserGender,
  verifyEmail,
} from "../controllers/usersControllers.js";

const router = Router();
router.get("/verify-email/:token", verifyEmail);
router.use(authenticate);

router.get("/me", getUser);
router.patch("/me/avatar", upload.single("avatar"), updateUserAvatar);
router.patch("/me", celebrate(updateUserSchema), updateUser);
router.patch("/me/gender", celebrate(updateUserGenderSchema), updateUserGender);

export default router;
