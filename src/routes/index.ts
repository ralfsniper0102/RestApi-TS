import { Router } from "express";
import userRouter from "./userRouter";
import clientRouter from "./clientRouter";

const router = Router();

router.use(userRouter);
router.use(clientRouter);

export default router;