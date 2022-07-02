import db from '../db.js';

export async function minusTransition(req, res) {
    const { value, description } = req.body;

    db.collection("transition").insertOne( { value, description,  "status": 'minus' , userId: res.locals.existingUser.userId } )

    res.sendStatus(200) 
}


export async function plusTransition(req, res) {
    const value = req.body;
    await db.collection("transition").insertOne( { ...value, "status": 'plus' , userId: res.locals.existingUser.userId } )
    res.sendStatus(200)
}


export async function getTransition(req, res) {

    const transitionUser = await db.collection("transition").find( { $or: [ { userId : res.locals.existingUser.userId } ] } ).toArray();
    // await db.collection("transition").aggregate( [{  }])
    
    res.sendStatus(200)
}
