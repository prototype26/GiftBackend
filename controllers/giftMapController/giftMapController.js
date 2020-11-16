const GiftsCardsMap = require('../../model/giftCardsModel/giftCardsModel');

exports.getGiftCardsMap = async (req, res) => {
    try {
        const items = await GiftsCardsMap.find({});
        res.status(200).json({
            status: "success",
            results: items.length,
            items: items
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
        console.log("req.body: "+req.body);
        const newCategory = await GiftsCardsMap.create(req.body);
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