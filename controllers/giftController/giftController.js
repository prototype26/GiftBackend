const Gifts = require('../../model/giftModel/giftModel');
const giftService = require('../../service/giftService/giftService');
exports.getAllItems = async (req, res) => {
    //code getAllGifts 
    var itemsArr = req.params.subcategory.split(',');
    try {
        const items = await Gifts.find({
            subcategory: {
                $in: itemsArr
            }
        });
        //service call
        var arr = giftService.getHashMap(items);
        var subcatArr = giftService.getHashMapSubcategory(items);
        res.status(200).json({
            status: 'success',
            returnArr: items,
            results: items.length,
            items: arr,
            subcategoryHashmap: subcatArr
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
}



exports.createCategory = async (req, res) => {
    //create category code 
    try {
        const newCategory = await Gifts.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Category created',
            data: {
                details: newCategory
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.deleteAllItems = async (req, res) => {
    try {
        var mainCategory = req.params.maincategory;
        await Gifts.remove({
            maincategory: mainCategory
        })
        res.status(204).json({
            status: 'success',
            message: 'documents deleted',
            data: {
                items: null
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
}