import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";
import { updateUserSchema } from "../validations/userValidation.js";
import {
  getUser,
  updateUser,
  updateUserAvatar,
} from "../controllers/usersControllers.js";

const router = Router();
router.use(authenticate);

router.get("/me", getUser);
router.patch("/me/avatar", upload.single("avatar"), updateUserAvatar);
router.patch("/me", celebrate(updateUserSchema), updateUser);

export default router;
