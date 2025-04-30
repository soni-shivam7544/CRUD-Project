const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path= require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");

//Database connection
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>console.log("connected to db"))
.catch(err=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}

//set ejs as view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);


app.use(express.static(path.join(__dirname,"/public")));

//routes
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
app.get("/listings/:id",async(req,res)=>{
    let {id} =req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});
app.get("/listings",async(req,res)=>{
    const allListings= await Listing.find();
    
    res.render("listings/index.ejs",{ allListings });
});
app.get("/",(req,res)=>{
    res.send("root page");
});
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}= req.params;
    let listing=await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});
app.post("/listings",async(req,res)=>{
    const newListing= new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");
});
app.patch("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,req.body);
    res.redirect(`/listings/${id}`);
})
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});