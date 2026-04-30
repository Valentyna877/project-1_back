import { Router } from "express";
import {
  getAllEmotions,
  getEmotionById,
} from "../controllers/emotionsController.js";
import { celebrate } from "celebrate";
import { idSchema } from "../validations/idValidation.js";

const router = Router();

router.get("/", getAllEmotions);
router.get("/:emotionId", celebrate(idSchema), getEmotionById);

export default router;
