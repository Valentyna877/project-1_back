import { Router } from "express";
import authRouter from "./authRoutes.js";
import tasksRoutes from "./tasksRoutes.js";
import usersRoutes from "./usersRoutes.js";
import weeksRoutes from "./weeksRoutes.js";
import diariesRoutes from "./diariesRoutes.js";
import emotionsRouter from "./emotionsRoutes.js";
import googleRoutes from "./authGoogle.js";

const router = Router();

router.use("/auth", authRouter, googleRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
router.use("/weeks", weeksRoutes);
router.use("/diaries", diariesRoutes);
router.use("/emotions", emotionsRouter);

export default router;
