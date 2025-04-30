const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Listings = require("./models/listings")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust")
}

main().then(()=>{
    console.log("Connected DB")
}).catch((err) =>{
    console.log(err)
})


//Home Route
app.get("/", (req, res)=>{
    res.send("Hi! I am root");
})


//test route
app.get("/test", (req,res)=> {

    try{
        const Listing1 = new Listings({
            title: "Home",
            description:"Home-Sweet-Home",
            price: 1000,
            location:"Mumbai",
            country:"India"

            
        })
        Listing1.save();
        console.log("sample saved");
        res.send("Successful. Keep working!")
    }catch(err){
        console.error("Save error:",err)
    }
})





app.listen(8080, ()=>{
    console.log("listening to port 8080....")
})