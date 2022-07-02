import db from "../db.js";


export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const existingUser = await db.collection("sessions").findOne({ "token": token } );

    if (!existingUser) {
        res.sendStatus(401);
        return
    }

    res.locals.existingUser = existingUser;

    next();
}