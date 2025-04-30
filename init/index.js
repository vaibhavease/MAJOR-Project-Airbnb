const mongoose = require('mongoose');
const Listings = require('../models/listings');
const initData = require("./data.js")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust")
}

main().then(()=>{
    console.log("Connected DB")
}).catch((err) =>{
    console.log(err)
})

const initDB = async () => {
    await Listings.deleteMany({});
    await Listings.insertMany(initData.data);
    console.log("data was initialized  ")
    }

    initDB();