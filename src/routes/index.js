import { Router } from "express";
import authRouter from "./authRoutes.js";
import tasksRoutes from "./tasksRoutes.js";
import usersRoutes from "./usersRoutes.js";
import weeksRoutes from "./weeksRoutes.js";
import diariesRoutes from "./diariesRoutes.js";
import emotionsRouter from "./emotionsRoutes.js";
import googleRoutes from "./authGoogle.js";

const router = Router();

router.use("/api/auth", authRouter, googleRoutes);
router.use("/api/tasks", tasksRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/weeks", weeksRoutes);
router.use("/api/diaries", diariesRoutes);
router.use("/api/emotions", emotionsRouter);

export default router;
