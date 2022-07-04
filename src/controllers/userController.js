import bcrypt from 'bcrypt';
import db from '../db.js';
import { v4 as uuid } from 'uuid';

export async function signIn(req, res) {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })
        return res.send({ token, name: user.name });
    } else {
        res.sendStatus(401);
    }
}

export async function signUp(req, res) {
    const newUser = req.body;

    const passwordHash = bcrypt.hashSync(newUser.password, 10);

    delete newUser.password;
    delete newUser.confirmPassword;

    await db.collection('users').insertOne({ ...newUser, password: passwordHash })
    
    res.sendStatus(200);
}
