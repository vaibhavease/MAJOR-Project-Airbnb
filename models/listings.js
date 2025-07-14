const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ]

}) ;

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({
        _id : {
            $in: listing.reviews
        }
        
    });
})

const Listings = mongoose.model("Listing",listingSchema)
module.exports = Listings;