import { Router } from "express";
import  userRouter from "./userRouter.js";
import transitionRouter from "./transitionRouter.js";

const router = Router();
router.use(userRouter);
router.use(transitionRouter);

export default router;