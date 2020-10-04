const express = require('express');
const router = express.Router();
const giftController = require('../../controllers/giftController/giftController');

router
   .route('/:subcategory')
   .get(giftController.getAllItems)
   
router
   .route('/')
   .post(giftController.createCategory)
   // .delete(giftController.deleteAllItems)

router
   .route('/:maincategory')  
   .delete(giftController.deleteAllItems) 
module.exports = router;