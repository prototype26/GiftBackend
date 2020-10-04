const mongoose = require('mongoose');
const giftCardsSchema = new mongoose.Schema({
    maincategory:{
        type:String,
        required:[true,"maincategory mandatory"],
        unique:true,
    },
    maincategoryCards:{
        type:String,
        required:[true,"maincategoryCards mandatory"],
        unique:true,
    },
    subcategoryCards:{
        type:String,
        required:[true,"subcategoryCards mandatory"],
        unique:true,
    }
});

const GiftsCardsMap = mongoose.model('GiftsCardsMap',giftCardsSchema,'GiftsCardsMap');
module.exports = GiftsCardsMap;