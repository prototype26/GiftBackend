const mongoose = require('mongoose');
//schema definition
const giftSchema = new mongoose.Schema({
    maincategory:{
        type:String,
        required:[true,'maincategory mandatory'],
        unique:true,
    },
    subcategory:{
        type:String,
        required:[true,'subcategory mandatory'],
        unique:true,
    },
});

//model creation
const Gifts = mongoose.model('Gifts',giftSchema,'Gifts');
module.exports = Gifts;
