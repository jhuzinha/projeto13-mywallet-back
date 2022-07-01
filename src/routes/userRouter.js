import { Router } from 'express';
import { registerUser, signUp } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post("/login", signUp);
userRouter.post("/register", registerUser);

export default userRouter;