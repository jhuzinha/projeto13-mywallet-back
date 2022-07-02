import transitionSchema from '../schemas/transitionSchema.js';

export async function validateTransition(req, res, next) {
    const validation = transitionSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }
    next();
}

