import { Router } from "express";
import {
  getBabyState,
  getMomState,
  getPregnancyInfo,
  getPregnancyInfoPublic,
} from "../controllers/weeksController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/public", getPregnancyInfoPublic);
router.get("/", authenticate, getPregnancyInfo);
router.get("/baby/:week", authenticate, getBabyState);
router.get("/mom/:week", authenticate, getMomState);

export default router;
