const Gifts = require('../../model/giftModel/giftModel');
const giftService = require('../../service/giftService/giftService');
    exports.getAllItems = async(req, res)=>{
        //code getAllGifts 
        var itemsArr = req.params.subcategory.split(',');
        try{   
            const items = await Gifts.find({subcategory: {$in: itemsArr}});
            //service call
            var rankedHashMap = new Map();
            rankedHashMap = giftService.getHashMap(items);
            rankedHashMap.forEach((value,key,rankedHashMap)=>{
                console.log(`key: ${key}  value: ${value}`);
            })
            res.status(200).json({
            status:'success',
            results:items.length,
            items:items
        });
        }catch(error){
            res.status(404).json({
            status:'fail',
            message:error
            });
        }  
   }

   exports.createCategory = async(req,res)=>{
    //create category code 
    console.log(req.body)
    try{
    const newCategory = await Gifts.create(req.body);      
    res.status(201).json({
       status:'success',
       message:'Category created',
       data : {
           details: newCategory
       }
    });
    }catch(error){
        res.status(400).json({
            status:'fail',
            message:error
        })
    }
   }

