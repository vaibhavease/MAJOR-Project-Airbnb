const express = require('express')
const app = express();
const mongoose = require('mongoose');
const Listings = require("./models/listings")
const path = require("path");
const methodOverride = require('method-override'); 
const engine = require('ejs-mate'); 
const wrapAsync = require("./utils/wrapsAsync");
// const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review")
// const {listingSchema} = require("./schema")
// const {reviewSchema} = require("./schema") 



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust")
}

main().then(()=>{
    console.log("Connected DB")
}).catch((err) =>{
    console.log(err)
})
app.set("view engine", "ejs");  
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method')); 
app.engine("ejs",engine)
app.use(express.static(path.join(__dirname, "public"))); 

//Home Route
app.get("/", (req, res)=>{
    res.send("Hi! I am root");
})


//Index Route
app.get("/listings", async (req,res) => {
    let  AllListings = await Listings.find();
    res.render("listings/index" ,{AllListings})
})


//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Show route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params ;
    const listing = await Listings.findById(id).populate('reviews');
    res.render("listings/show.ejs", {listing})
})

//Create Route
app.post("/listings", wrapAsync(async(req,res,next)=> {
  let result =  listingSchema.validate(req.body)
  console.log(result);
    // if(listing.error){
    //     throw ExpressError(404, result.error)
    // }
    const listing = new Listings(req.body.listing); 
    await listing.save();
    res.redirect('/listings');
    console.log(req.body.listing)
}))

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params ;
    const listing = await Listings.findById(id);
    res.render("listings/edit.ejs",{listing})
})


//Update Route
app.put("/listings/:id", async (req,res)=>{
    let {id} = req.params ;
   await Listings.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}   );



//Delete Route
app.delete("/listings/:id", async (req,res)=>{
    let {id} = req.params ;
    let li = await Listings.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(li)
}) 

//Reviews
//Post route

app.post("/listings/:id/reviews", async(req, res)=>{
    
   let listing = await Listings.findById(req.params.id);
   
   let newReview = new Review(req.body.review)

   listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();

   res.redirect(`/listings/${listing._id}`)
})

//Delete route for reviews
app.delete("/listings/:id/reviews/:reviewId", async(req, res)=>{
    let {id, reviewId} = req.params;
    await Listings.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
})

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404 , "Page Not Found!"))
// })

// app.use(( err, req ,res,next) => {
//     let{statusCode, message }    = err;
//     res.status(statusCode).send(message);})

app.listen(8080, ()=>{
    console.log("listening to port 8080....")
})