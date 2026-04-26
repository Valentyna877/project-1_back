import { Router } from "express";
import { celebrate } from "celebrate";

import {
  getAllDiariesSchema,
  createDiarySchema,
  updateDiarySchema,
  deleteDiarySchema,
} from "../validations/diariesValidation.js";

import {
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
} from "../controllers/diariesController.js";

const router = Router();

router.get("/", celebrate(getAllDiariesSchema), getAllDiaries);
router.post("/", celebrate(createDiarySchema), createDiary);
router.patch("/:diaryId", celebrate(updateDiarySchema), updateDiary);
router.delete("/:diaryId", celebrate(deleteDiarySchema), deleteDiary);

export default router;
