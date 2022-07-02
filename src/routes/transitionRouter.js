import { Router } from 'express';
import { plusTransition, minusTransition, getTransition  } from '../controllers/transitionController.js';
import { validateToken } from '../middlewares/authMiddleware.js';
import { validateTransition } from '../middlewares/transitionMiddleware.js';

const transitionRouter = Router();

transitionRouter.post("/entry", validateToken, validateTransition, plusTransition);
transitionRouter.post("/output", validateToken, validateToken, validateTransition, minusTransition);
transitionRouter.get("/main", validateToken, getTransition);

export default transitionRouter;