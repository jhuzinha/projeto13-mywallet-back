import { Router } from 'express';
import { signUp, signIn } from '../controllers/userController.js';
import { validateUser, validateUserSignIn, validateUserSignUp } from '../middlewares/authMiddleware.js';


const userRouter = Router();

userRouter.post("/login",  validateUserSignIn, signIn);
userRouter.post("/register", validateUser, validateUserSignUp, signUp);

export default userRouter;