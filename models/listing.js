const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "../images/premium_photo-1710030733249-5d7c34509f61.avif",
        set: (v)=> v==="" ? "../images/premium_photo-1710030733249-5d7c34509f61.avif" : v,

    },
    price: Number,
    location: String,
    country: String
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports= Listing;