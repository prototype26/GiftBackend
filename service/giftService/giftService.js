//service method accepts array of json objects and returns hashmap of ranked categories
exports.getHashMap = (itemsArr) =>{
    var hashmap = new Map();
    itemsArr.forEach(jsonObj => {
        if(hashmap.has(jsonObj.maincategory)){
            //for existing value increase count by 1.
            var count = hashmap.get(jsonObj.maincategory);
            hashmap.set(jsonObj.maincategory,(count+1));
        }
        else
        {
            //initial value set to 0
            hashmap.set(jsonObj.maincategory,0);
        }
    });
    var sortedMap = new Map([...hashmap.entries()].sort((a,b)=>b[1] - a[1]))
    return new Map([...sortedMap.entries()].slice(0,10)); //return a sorted hashmap of 10 elements
}