//file to read data from csvs --> convert to array of jsons and post to DB
function process(dataString) {
  var lines = dataString
    .split(/\n/)
    .map(function (lineStr) {
      return lineStr.split(",");
    });

  var keys = lines[0];

  var objects = lines
    .slice(1)
    .map(function (arr) {
      return arr.reduce(function (obj, val, i) {
        obj[keys[i]] = val;
        return obj;
      }, {});
    });

  return objects;
}

function test() {
  var file = fileInput.files[0];
  var textType = /text.*/;
  var csvType = 'text/csv';
  if (file.type.match(csvType)) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var objRe = process(reader.result);
      var categoryArr = [];
      objRe.forEach(element => {
        if (element.category) {
          var newElement = element.category + "";
          if (newElement.includes("&")) {
            var newArr = newElement.split("&");
            newArr.forEach((newEle) => {
              categoryArr.push(newEle.trim().toLowerCase());
            })
          } else {
            categoryArr.push((element.category + "").toLowerCase());
          }
        } else if (element[0]) {
          var newElement = element[0] + "";
          if (newElement.includes("&")) {
            var newArr = newElement.split("&");
            newArr.forEach((newEle) => {
              categoryArr.push(newEle.trim().toLowerCase());
            })
          } else {
            categoryArr.push((element[0] + "").toLowerCase());
          }
        }
      });
      var jsonObjArr = [];
      let unique = [...new Set(categoryArr)];
      //unique array of category elements
      console.log(unique);
      unique.forEach(itemname => {
        var jsonObj = {
          "maincategory": "tools and home improvement",
          "subcategory": ""
        }
        jsonObj.subcategory = itemname;
        jsonObjArr.push(jsonObj);
      });
      //final array of json objects to upload
      console.log(jsonObjArr);
      console.log('calling api now');
      calltoApi(jsonObjArr)
    }
    reader.readAsText(file);
  } else {
    fileDisplayArea.innerText = "File not supported!";
  }


}
var chunkSize = 500;
async function calltoApi(jsonObjArr) {
  var jsonObjArrSize = jsonObjArr.length/500;
  if (jsonObjArr.length > 1200) {
    //chunking large json arr to smaller chunks
    for(var i = 0; i <=jsonObjArrSize; i++)
    {
      var newArr = jsonObjArr.splice(chunkSize);
      console.log(jsonObjArr.length);
      halfCall(jsonObjArr);
      jsonObjArr = newArr;
    }

  } else {
    axios.post('http://localhost:3002/giftapi/v1/gifts', jsonObjArr)
      .then(response => {
        console.log(`added to DB: ${response}`)
      })
      .catch(error => {
        console.log(error)
      });
  }
}

async function halfCall(jsonArr) {
  axios.post('http://localhost:3002/giftapi/v1/gifts', jsonArr)
    .then(response => {
      console.log(`added to DB: ${response}`)
      return
    })
    .catch(error => {
      console.log(error)
    });
}