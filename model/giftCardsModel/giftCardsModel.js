const mongoose = require('mongoose');
const giftCardsSchema = new mongoose.Schema({
    giftsCardsMainCategory: {
        type: String,
        required: [true, 'giftsCardsMainCategory mandatory'],
    },
    giftsCardsSubCategory: {
        type: String,
        required: [true, 'giftsCardsSubCategory mandatory'],
        unique:true
    }
});

const GiftsCardsMap = mongoose.model('GiftsCardsMap', giftCardsSchema, 'GiftsCardsMap');
module.exports = GiftsCardsMap;