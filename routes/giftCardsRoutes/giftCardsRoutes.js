const express = require('express');
const router = express.Router();
const giftMapController = require('../../controllers/giftMapController/giftMapController');


router
   .route('/')
   .get(giftMapController.getGiftCardsMap);

module.exports = router;