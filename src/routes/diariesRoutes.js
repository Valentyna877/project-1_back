import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getAllDiariesSchema,
  createDiarySchema,
  updateDiarySchema,
} from "../validations/diariesValidation.js";
import {
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getDiaryById,
} from "../controllers/diariesController.js";
import { diaryIdSchema } from "../validations/idValidation.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", celebrate(getAllDiariesSchema), getAllDiaries);
router.get("/:diaryId", celebrate(diaryIdSchema), getDiaryById);
router.post("/", celebrate(createDiarySchema, diaryIdSchema), createDiary);
router.patch(
  "/:diaryId",
  celebrate(updateDiarySchema, diaryIdSchema),
  updateDiary,
);
router.delete("/:diaryId", celebrate(diaryIdSchema), deleteDiary);

export default router;
