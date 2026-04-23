import { Router } from "express";
import { getBabyState, getMomState } from "../controllers/weeksController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get('/baby/:week', authenticate, getBabyState);
router.get('/mom/:week', authenticate, getMomState);

export default router;