import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getAllDiariesSchema,
  createDiarySchema,
  updateDiarySchema,
  // deleteDiarySchema,
  // getDiaryByIdSchema,
} from "../validations/diariesValidation.js";
import {
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaryById,
} from "../controllers/diariesController.js";
import { idSchema } from "../validations/idValidation.js";

const router = Router();

router.get("/", celebrate(getAllDiariesSchema), getAllDiaries);
router.get("/:diaryId", celebrate(idSchema), getDiaryById);
router.post("/", celebrate(createDiarySchema), createDiary);
router.patch("/:diaryId", celebrate(updateDiarySchema, idSchema), updateDiary);
router.delete("/:diaryId", celebrate(idSchema), deleteDiary);

export default router;
