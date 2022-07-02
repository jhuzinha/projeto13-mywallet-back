import dayjs from 'dayjs';
import db from '../db.js';

export async function minusTransition(req, res) {
    let { value, description } = req.body;
    value = parseFloat(value)*(-1)

    db.collection("transition").insertOne( { value, description,  "status": 'minus' , userId: res.locals.existingUser.userId, "day": dayjs().format("DD/MM") } )

    res.sendStatus(200) 
}


export async function plusTransition(req, res) {
    let { value, description } = req.body;
    value = parseFloat(value)

    await db.collection("transition").insertOne( {  value, description, "status": 'plus' , userId: res.locals.existingUser.userId, "day": dayjs().format("DD/MM") } )
    res.sendStatus(200)
}


export async function getTransition(req, res) {

    const transitionUser = await db.collection("transition").find( { $or: [ { userId : res.locals.existingUser.userId } ] } ).toArray();
    
    const sum = await db.collection("transition").aggregate( [{ $match: { status: "plus" } }, { $group: { _id: '$status', total: { $sum: "$value"} } }]).toArray();
    const minus = await db.collection("transition").aggregate( [{ $match: { status: "minus" } }, { $group: { _id: '$status', total: { $sum: "$value"} } }]).toArray();
    
    const total = { sum, minus }

    console.log(total)

    
    res.send({ transitionUser, total }).status(200)
}
