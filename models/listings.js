const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description: String,
    image:{
        filename:{
            type: String},

        url:{
            type:String ,
        
        default:"https://unsplash.com/photos/white-ceramic-plate-on-brown-wooden-table-8DlbPCxfGHA",
        set:(v) => v==="" ? "https://unsplash.com/photos/white-ceramic-plate-on-brown-wooden-table-8DlbPCxfGHA" : v,
    },
},
    price: Number,
    location: String,
    country:String,

}) ;


const Listings = mongoose.model("Listing",listingSchema)
module.exports = Listings;