import { Router } from "express";
import { loginGoogle } from "../controllers/authGoogle.js";

const router = Router();

router.post("/google", loginGoogle);

export default router;
