import { Router } from 'express';
import { plusTransition, minusTransition, getTransition  } from '../controllers/transitionController.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';
import { validateTransition } from '../middlewares/transitionMiddleware.js';

const transitionRouter = Router();

transitionRouter.post("/entry", validateTransition, validateToken, plusTransition);
transitionRouter.post("/output", validateTransition, validateToken, minusTransition);
transitionRouter.get("/main", validateToken, getTransition);

export default transitionRouter;