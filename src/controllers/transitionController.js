import dayjs from 'dayjs';
import db from '../db.js';

export async function minusTransition(req, res) {
    let { value, description } = req.body;
    value = value.replace(",",".");

    db.collection("transition").insertOne( { value: parseFloat(value)*(-1), description,  "status": 'minus' , userId: res.locals.existingUser.userId, "day": dayjs().format("DD/MM") } )

    res.sendStatus(200) 
}


export async function plusTransition(req, res) {
    let { value, description } = req.body;
    value = value.replace(",",".");

    await db.collection("transition").insertOne( {  value: parseFloat(value) , description, "status": 'plus' , userId: res.locals.existingUser.userId, "day": dayjs().format("DD/MM") } )
    res.sendStatus(200)
}


export async function getTransition(req, res) {
    let total;
    let type;
    
    const transitionUser = await db.collection("transition").find( { $or: [ { userId : res.locals.existingUser.userId } ] } ).toArray();
    
    const sum = await db.collection("transition").aggregate( [{ $match: { userId : res.locals.existingUser.userId } }, { $group: { _id: null, total:{ $sum: "$value"} } }]).toArray();
    if (sum.length === 0) {
        total = 0
        res.send({ transitionUser, total }).status(200)
        return
    }


    total = sum[0].total
    res.send({ transitionUser, total, type }).status(200)
}
