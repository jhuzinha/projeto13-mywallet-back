import db from "../db.js";
import loginSchema from '../schemas/loginSchema.js';
import registerSchema from '../schemas/registerSchema.js';


export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const existingUser = await db.collection("sessions").findOne({ "token": token } );
    console.log(req.headers)
    if (existingUser === null) {
        res.sendStatus(401);
        return
    }

    res.locals.existingUser = existingUser;

    next();
}


export async function validateUser(req, res, next) {
    const newUser = req.body;
    const existingUser = await db.collection('users').findOne({ "email": newUser.email });

    if (existingUser) {
        res.sendStatus(422);
        return
    }
    next();
}


export async function validateUserSignUp(req, res, next) {
    const validation = registerSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}


export async function validateUserSignIn(req, res, next) {
    const validation = loginSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    next();
}