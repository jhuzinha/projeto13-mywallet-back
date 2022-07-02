import registerSchema from '../schemas/registerSchema.js';
import bcrypt from 'bcrypt';
import db from '../db.js';
import { v4 as uuid } from 'uuid';
import loginSchema from '../schemas/loginSchema.js';

export async function signUp(req, res) {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });
    const validation = loginSchema.validate(req.body);

    if (validation.error) {
        return res.sendStatus(422);
    }

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })
        return res.send(token);
    } else {
        res.sendStatus(401);
    }
}

export async function registerUser(req, res) {
    const newUser = req.body;
    const validation = registerSchema.validate(newUser);

    if (validation.error) {
        return res.sendStatus(422);
    }

    const existingUser = await db.collection('users').findOne({ "email": newUser.email });

    if (existingUser) {
        res.sendStatus(422);
        return
    }

    const passwordHash = bcrypt.hashSync(newUser.password, 10);

    delete newUser.password;
    delete newUser.confirmPassword;

    await db.collection('users').insertOne({ ...newUser, password: passwordHash })
    
    res.sendStatus(200);
}
