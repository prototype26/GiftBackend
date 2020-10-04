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