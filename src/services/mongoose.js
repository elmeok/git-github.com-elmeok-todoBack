require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

//connectDb().catch(err => console.log(err));

async function connectDb(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Db connecté');
}

module.exports = {
    connectDb
}