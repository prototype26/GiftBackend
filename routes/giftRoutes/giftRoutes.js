const express = require('express');
const router = express.Router();
const giftController = require('../../controllers/giftController/giftController');

router
   .route('/:subcategory')
   .get(giftController.getAllItems)
   
router
   .route('/')
   .post(giftController.createCategory);

module.exports = router;