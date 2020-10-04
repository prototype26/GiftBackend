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
var cardsArr = [];

function test() {
    var data = GiftCardsCategoryJson.data;
    data.forEach(json => {
        var jsonCards = {
            maincategory: "",
            subcategory: ""
        }

        if (json.type == "category") {
            var arr = [];
            jsonCards.maincategory = json.attributes.name + "_" + json.attributes.id;
            json.attributes.sub_categories.forEach(subcatJson => {
                arr.push(subcatJson.code + "_" + subcatJson.id)
            });
            jsonCards.subcategory = arr;
        }
        cardsArr.push(jsonCards);
    });
    console.log(`cardsArr: ${JSON.stringify(cardsArr)}`);
}


///////////////////////////utility function////////////////////////////////
// function test() {
//   var file = fileInput.files[0];
//   var textType = /text.*/;
//   var csvType = 'text/csv';
//   if (file.type.match(csvType)) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       var objRe = process(reader.result);
//       var categoryArr = [];
//       objRe.forEach(element => {
//         if (element.category) {
//           categoryArr.push((element.category + "").toLowerCase());
//           // var newElement = element.category + "";
//           // if (newElement.includes("&")) {
//           //   var newArr = newElement.split("&");
//           //   newArr.forEach((newEle) => {
//           //     categoryArr.push(newEle.trim().toLowerCase());
//           //   })
//           // } else {
//           //   categoryArr.push((element.category + "").toLowerCase());
//           // }
//         } else if (element[0]) {
//           categoryArr.push((element[0] + "").toLowerCase());
//           // var newElement = element[0] + "";
//           // if (newElement.includes("&")) {
//           //   var newArr = newElement.split("&");
//           //   newArr.forEach((newEle) => {
//           //     categoryArr.push(newEle.trim().toLowerCase());
//           //   })
//           // } else {
//           //   categoryArr.push((element[0] + "").toLowerCase());
//           // }
//         }
//       });
//       var jsonObjArr = [];
//       let unique = [...new Set(categoryArr)];
//       //unique array of category elements
//       console.log(unique);
//       unique.forEach(itemname => {
//         var jsonObj = {
//           "maincategory": "home appliances",
//           "subcategory": ""
//         }
//         jsonObj.subcategory = itemname;
//         jsonObjArr.push(jsonObj);
//       });
//       //final array of json objects to upload
//       console.log(jsonObjArr);
//       console.log('calling api now');
//       calltoApi(jsonObjArr)
//     }
//     reader.readAsText(file);
//   } else {
//     fileDisplayArea.innerText = "File not supported!";
//   }


// }
// var chunkSize = 500;
// async function calltoApi(jsonObjArr) {
//   console.log('inside callApi')
//   var jsonObjArrSize = jsonObjArr.length/500;
//   if (jsonObjArr.length > 1200) {
//     //chunking large json arr to smaller chunks
//     for(var i = 0; i <=jsonObjArrSize; i++)
//     {
//       console.log(`sending chunk--> ${i}`)
//       var newArr = jsonObjArr.splice(chunkSize);
//       console.log(jsonObjArr);
//       halfCall(jsonObjArr);
//       jsonObjArr = newArr;
//     }

//   } else {
//     // axios.post('http://localhost:3002/giftapi/v1/gifts', jsonObjArr)
//     //   .then(response => {
//     //     console.log(`added to DB: ${response}`)
//     //   })
//     //   .catch(error => {
//     //     console.log(error)
//     //   });
//   }
// }

// async function halfCall(jsonArr) {
//   // console.log(`halfCall->> ${jsonArr}`)
//   // axios.post('http://localhost:3002/giftapi/v1/gifts', jsonArr)
//   //   .then(response => {
//   //     console.log(`added to DB: ${response}`)
//   //     return
//   //   })
//   //   .catch(error => {
//   //     console.log(error)
//   //   });
// }
////////////////////////////////////utility function//////////////////////////////////
var GiftCardsCategoryJson = {
    "data": [{
            "id": "5",
            "type": "category",
            "attributes": {
                "id": 5,
                "name": "Shopping",
                "code": "shopping",
                "logo": {
                    "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/5/shoppings.png?Expires=1601648232&Signature=LHfXjHuhC6TE48CGRoZVxQyRZf2kkKtQ0Yi~psb~wkFPWNjmgbyR85iBanHAAdFGkXIFGbyV7cOn2KqOpyicRDMY42p-83kF-RT6m4aQSKI6KP20tveQjs-uNQMLzM3rG3mGukyaGZKGmvcRG6p6~4xRVODsGo81LiskN3VjQzcozWNMWtU9MK9hXkHu6LqXIYF1ivCAj593aeejffyNYvrvlSu~Ur4jW1awWbKkCe8bSz1pyj3DHKRZmDBdKmkDHsVRr9X1s3U5qPxJ5UWUv1Sulw9sL0Qq1fSrjyZtcLs2zAmgPz-p-MNFaJNwB2t01es74NvQPF5sVn1xqJwhIQ__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                    "thumb": {
                        "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/5/thumb_shoppings.png?Expires=1601648232&Signature=BJOEL7awa5Ddi6RSC~iFHDzx9ttwQmdJGhs70duh5Ic634Uh45ghkReeEZyK7zzCwYwW0Ctniqt-sIHQGKm9RZ6EQo~NpdezbJlTHz1PNtamsTzVF1xGZe8ZnS2hc~NYC6DIE5zHUipKSEfeotm6PeU2lltblUDcUkhq7Fr-kkYgZgV6MVu3BXav1WRQLIYSazEe3KXvEhOtwbS3MCn2xLG9HMcAa7AlekOHoc0UNllfX699SMo8UDnHJxJ~DCUOzJr5lGIEgIdK0jnH11aHFVfugJ3rU7hiyPIr8BTEP4dpQi1Py6HqEljWCAWrm54o-V66wlpNkJSobF91lSvv1Q__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                    }
                },
                "parent_id": null,
                "total_items": 124,
                "sub_categories": [{
                        "id": 6,
                        "name": "Fashion & Accessories",
                        "code": "fashion-accessories",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:08:09.390+05:30",
                        "updated_at": "2020-08-30T18:09:55.291+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/6/dress.png?Expires=1601648232&Signature=iks4HZR~Z1FrzNEiFozuhDg1hmbwjVl9YdXIYJx8H4aFURdroPHURDaEtevSpBx0DWpEOToJpP1zatKEkprA~XV~TrGphNdKe9HX7GBSDnxaJoHZBhdH2XGLiIFSl37VJIAFf7yXXoYzGNiJpjJxcM4V4i8GFsr5opKd68Deoxuitaf5XF53mdcreeB2XxNJQuzcQqPMDp20jaG~-ZN56nqh2LMsWnlWG7Zeub151T7cNKRUcftX6eTvoHXVBq2k4R-xTTGxTX9GiToJAp81jjDe1sWc7VHBRRsBp635daPA4BDTLTMedbbLNAwR3bUq6LcAi-NHiIbfGZ-oDfFW-w__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/6/thumb_dress.png?Expires=1601648232&Signature=D~8VbKXKha1CGFOfFlssYGV2YDsLJ1JSqQ9w3F90psNNZavjYjPNHLeGqLUNs2RgttkOJdpbzJLmDytD8kATjKAbc9rXWUPXs0u-ieL9paYfU~i68Y~A6M9zKDF9lJDaJtkeJ7bwawNW0IinkO2-nLBQoH4NdvuNCoaORRLAsV38h49brcsm1VIDFI5qBpaNnaVu~DvKWSOh0xBOTC7LzijluoCMFaeGjNscf6jDn9EceTfgCTe7fiYi9XBiU2Cv6QSDWlfnb4R3TrRYDm8sUvvTlxABg4AOuvSXuax3bA7LriHQ0~Om0lZJt1XWK5XhcnIK59HNmk10GhpaHul-Jg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 91
                    },
                    {
                        "id": 8,
                        "name": "Jewellery",
                        "code": "jewellery",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:08:33.081+05:30",
                        "updated_at": "2019-09-30T19:08:33.081+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 20
                    },
                    {
                        "id": 14,
                        "name": "Gifting",
                        "code": "gifting",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:36:21.319+05:30",
                        "updated_at": "2019-09-30T19:36:21.319+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 11
                    },
                    {
                        "id": 7,
                        "name": "Home & Decor",
                        "code": "home-decor",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:08:24.905+05:30",
                        "updated_at": "2020-08-24T16:21:52.209+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/7/home_decor.png?Expires=1601648232&Signature=F~bLsL4ySqtR8CiYQr1DAwxARpp773wdPse1M-Lch6L-ku0DzUatiP9Ao4lYbDCwk2E2Jv2PAqquXihip3DxpgF-X5afu3luAZKE5q~Z4GKzofyREAmUXp9vsb069q4kWEN42Il4bBGkWLjF6OudRb~RcyxSkguAxQiAam--fiUYBTDa2tRLFKX4TBPpOSlx9xfH8aqEZ2JLiuwTbkzYF7BjQa1KnQsv9W0XMSsXF7Rkk01pxJR1ml~qpM~SfQnDcm~HWtWZHsMac8BN2wMM~GEnqSicQxZSjBREVLaKjYCn6JUzKhTppjFOPJfn-pKZpvNtiAjlY-UTHLz0mrsi6g__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/7/thumb_home_decor.png?Expires=1601648232&Signature=I4ckj0-dqUwgqsZ1exDJmbOjqFD8SUGkrhQvZjw~kJJNlSyyv-jKTP7IusFhAn80G-5vb4cDOTlbO-SsEFRsakA2r~~Rd1lqwlry9jQTuDCjHX-ImFP8UGPDuL-Y0wKeiCkf1IPFmJyZyfVdHVe55lgTjQ6MaekVcS5nURKAoJkOfD7vNbkWep957TGLVYTUNfOscfWpAzhkTJubRO1LXQah7W1D6I7zmgmOl~-AIhmm-QFGOtweDMTy10oJRW48glG7O8J6N6IEFcJxHOA5JpkZFejTeuJsUNbFJpUAICVCNeiKWp6admM8tyTn2ZOQ4uQwv1d1I3dlblWLoXiJsA__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 10
                    },
                    {
                        "id": 13,
                        "name": "Groceries",
                        "code": "groceries",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:35:46.232+05:30",
                        "updated_at": "2019-09-30T19:35:46.232+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 7
                    },
                    {
                        "id": 10,
                        "name": "Kids",
                        "code": "kids",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:08:53.974+05:30",
                        "updated_at": "2019-09-30T19:08:53.974+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 6
                    },
                    {
                        "id": 12,
                        "name": "Electronics",
                        "code": "electronics",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:09:40.988+05:30",
                        "updated_at": "2019-09-30T19:09:40.988+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 3
                    },
                    {
                        "id": 11,
                        "name": "Online Services",
                        "code": "online-services",
                        "parent_id": 5,
                        "created_at": "2019-09-30T19:09:04.835+05:30",
                        "updated_at": "2019-09-30T19:09:04.835+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 2
                    }
                ]
            }
        },
        {
            "id": "35",
            "type": "category",
            "attributes": {
                "id": 35,
                "name": "Entertainment",
                "code": "entertainment",
                "logo": {
                    "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/35/entertainments.png?Expires=1601648232&Signature=LY7tpO-Yy-fb9M2zq4pH2FXcpYLwcdwR7d~wqTg2P6XoikPPKK7LY~yCBWNx0oCNhaQXbKcnnMFnKKZDAZEB8tV6RB0mHiKi~VqeZlV24j6yt6f3WnOTKcfw9GdBNPFj1O8cbrOGUlBY-DORnjg-m7Zh3aY3OVdSWkBsTui1ZrLsD~N6VGqqNzAvaVfVvqZG1BTKcrIjlmXDeh4UtP9sG854Alq3pdAeYN4uiOIABUcf0qY417zeSrigw4qrf4d8aHkVuaHPJoncTebzeH2RFj9WNJlUIJzB0ZNE3rL8xpXBLQUr40tfyjIq6d63m0gsaslh-P-rmMjG1x2M0VR6wA__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                    "thumb": {
                        "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/35/thumb_entertainments.png?Expires=1601648232&Signature=d6uYy5l5Cnjid~kcujwD7YdpbfOS7WUb2ShsYZZwrnPXwT95rdMKOv2oOE7tt5hUo8O0pe4umG2kW58h8AdaG6yINuHLj63-lTi8Xemkw6~B570OQ5yLuOvasalhAX4wz32-in5x847ATPcRhBWXYxtlMoq-TnOlB-LBM6y9d04-yc98fBLuJxdX2MXD75BfxoN9uSnSwTLZZ2EhLkRiZqpoeR~YvrvWP3DhXOfV5ESvRk-8Ilw1kMkzXF6YhkWsiZJoiBwnM4VKNaRHUEsi-moTi~b7Q23w55js8gotKeKyPMahtvYgG8RuK09o9s8KNMfU0RC7Au6vU06yME9Fxg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                    }
                },
                "parent_id": null,
                "total_items": 41,
                "sub_categories": [{
                        "id": 36,
                        "name": "Publications",
                        "code": "publications",
                        "parent_id": 35,
                        "created_at": "2019-10-01T15:46:28.028+05:30",
                        "updated_at": "2019-10-01T15:46:28.028+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 19
                    },
                    {
                        "id": 39,
                        "name": "Streaming Content",
                        "code": "streaming-content",
                        "parent_id": 35,
                        "created_at": "2019-10-01T15:47:12.807+05:30",
                        "updated_at": "2019-10-01T15:47:12.807+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 19
                    },
                    {
                        "id": 37,
                        "name": "Movies",
                        "code": "movies",
                        "parent_id": 35,
                        "created_at": "2019-10-01T15:46:33.246+05:30",
                        "updated_at": "2019-10-01T15:46:33.246+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 10
                    },
                    {
                        "id": 71,
                        "name": "Gaming",
                        "code": "gaming",
                        "parent_id": 35,
                        "created_at": "2020-05-13T18:51:34.866+05:30",
                        "updated_at": "2020-05-13T18:51:34.866+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 4
                    },
                    {
                        "id": 38,
                        "name": "Events",
                        "code": "events",
                        "parent_id": 35,
                        "created_at": "2019-10-01T15:46:38.677+05:30",
                        "updated_at": "2019-10-01T15:46:38.677+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 1
                    }
                ]
            }
        },
        {
            "id": "15",
            "type": "category",
            "attributes": {
                "id": 15,
                "name": "Dining",
                "code": "dining",
                "logo": {
                    "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/15/dinings.png?Expires=1601648232&Signature=QUDRhQwHDHXmhG90SmceTrTa8HXnLzNQkJXgY6n52qOuxK57oJW3c38Ca7X3-sgUHmUABDJKX-pK7Dpg3gLVWFteeAjO7Io9d4jQX3qET2N9l~ML-wYyUWv0V8Z7fRJP8-WPreoVycbybJNdrgJHhWkVBWwjPYIngmqhnU-L8jHlXCI1I-lXAduyg5lewVSJTzBGg92jKUvWJKJWDMIv2dKTz6tM5HUcJimdIFxpjkXQ917En-3AAV7ZBTZxZVKZXZ4zDliS~SuZJcD2Bq1VEgjUmGwG~NbE5ctAngaxqgRML-q33F4zRp0BkdHsj82IDgwSGaLLcT2mFUFiYEu0XQ__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                    "thumb": {
                        "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/15/thumb_dinings.png?Expires=1601648232&Signature=eli7YOdf5~spqXvDkBVyxSSHjxQoUMwKWO1H5S2QPkRTSglZEhOFVNyl-Yw1g4dfJtQYTJ5WC5ZNU2DXgypYdBB~yiyKRgkdpo7Y1g3nxSrjkMlpe13YVoxsIEGsl8hPVl0kpQJ2suWNgpVw6CtEbaxLwHoQMzKt8FY6YzMaxTo1NtD8LINSQ43tAeyEejyKHK3G1wVMf5-hV91zX5eLFAPFhDRV6T3DjuQazo-1VjZObGvWOLK7mCVAbabypU9EBuf3fKENIl9g9bX1ehvm~LKHCLUajd0sAmm9ttYXL4qRZuqJGzu9FP6uK7RaIqAbqRPGKMfGtJglO4RZFdyP6w__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                    }
                },
                "parent_id": null,
                "total_items": 20,
                "sub_categories": [{
                        "id": 24,
                        "name": "Dining Out",
                        "code": "dining-out",
                        "parent_id": 15,
                        "created_at": "2019-10-01T14:30:03.148+05:30",
                        "updated_at": "2019-10-01T14:30:03.148+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 11
                    },
                    {
                        "id": 26,
                        "name": "Cafes & Fast Food",
                        "code": "cafes-fast-food",
                        "parent_id": 15,
                        "created_at": "2019-10-01T14:30:47.676+05:30",
                        "updated_at": "2019-10-01T14:30:47.676+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 10
                    },
                    {
                        "id": 25,
                        "name": "Ordering In",
                        "code": "ordering-in",
                        "parent_id": 15,
                        "created_at": "2019-10-01T14:30:29.570+05:30",
                        "updated_at": "2019-10-01T14:30:29.570+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 5
                    }
                ]
            }
        },
        {
            "id": "1",
            "type": "category",
            "attributes": {
                "id": 1,
                "name": "Travel",
                "code": "travel",
                "logo": {
                    "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/1/travels.png?Expires=1601648232&Signature=f82e00Ip~yboMWPM2bCUprDW3usPr9SQjAndGRcNGGHToOK2Joqqix7VOEwQEh7RVgoZkCPACAxIWfbDHxy4cHd6rbfSoI-jmVQTWvqD92f0QRop24v~iB~8vO20tLkuHBjIjCsSkmMkWsu1z5V76WfJfUZ43YgoJHuavbTUp6tmVLM80blepi0sYOZjUizK5Mi64UKAL2PBxWirh8EVivU6akL5W5lix583ZenaKKsTXbsGdnuzvdaCiHtTaKf6-Mt0bUDHRVYavr5nppqjBiHTlDFebFvHqDaCfso4ev83yvuliEPr4ojzODMt7GexOkqyV4AwkmlzOuwhDUkFhA__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                    "thumb": {
                        "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/1/thumb_travels.png?Expires=1601648232&Signature=SF3D~dL0HA8qYGXtyF89CZxDxXY1zl-7oUS64gfY22vxNNoj8Eoyx5f5GTWLu20mDi8FhGz37eJXL~kK6wEtH~-D2knxmmcMIjAc1zrDU7a-0MXDqeUNQUS1iWnE7Fp5IFmaEdSn2TzPZTJF1fIoVV67aM8HEldpFZGl1jbWWBz-th9kHju5M9B2tLDcXHbxUjIRViTRVHM6pBFcNfPM9PmV-1sKAmliwM7oSpFHT4Zu1fjIdnidWIBqm-12tD8EWIZnPaq7j5sWMqSZnkV8xlUG1EaqriP0hSOkihvfeNQMw5HqgovVDioXEOaLIDe1L61fFIHOWcbUMD80SHs-og__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                    }
                },
                "parent_id": null,
                "total_items": 15,
                "sub_categories": [{
                        "id": 3,
                        "name": "Hotels",
                        "code": "hotels",
                        "parent_id": 1,
                        "created_at": "2019-09-30T18:30:04.784+05:30",
                        "updated_at": "2019-09-30T18:30:04.784+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 13
                    },
                    {
                        "id": 4,
                        "name": "Flights",
                        "code": "flights",
                        "parent_id": 1,
                        "created_at": "2019-09-30T18:30:13.422+05:30",
                        "updated_at": "2019-09-30T18:30:13.422+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 6
                    },
                    {
                        "id": 27,
                        "name": "Tours & Activities",
                        "code": "tours-activities",
                        "parent_id": 1,
                        "created_at": "2019-10-01T14:31:13.190+05:30",
                        "updated_at": "2019-10-01T14:31:13.190+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 6
                    },
                    {
                        "id": 41,
                        "name": "Bus",
                        "code": "bus",
                        "parent_id": 1,
                        "created_at": "2019-10-11T14:09:06.323+05:30",
                        "updated_at": "2019-10-11T14:09:06.323+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 2
                    },
                    {
                        "id": 2,
                        "name": "Car Rentals",
                        "code": "car-rentals",
                        "parent_id": 1,
                        "created_at": "2019-09-30T18:29:39.714+05:30",
                        "updated_at": "2019-09-30T18:29:39.714+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 1
                    },
                    {
                        "id": 43,
                        "name": "Trains",
                        "code": "trains",
                        "parent_id": 1,
                        "created_at": "2019-10-11T19:04:41.743+05:30",
                        "updated_at": "2019-10-11T19:04:41.743+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 1
                    }
                ]
            }
        },
        {
            "id": "16",
            "type": "category",
            "attributes": {
                "id": 16,
                "name": "Health & Wellness",
                "code": "health-wellness",
                "logo": {
                    "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/16/healths.png?Expires=1601648232&Signature=iwkwmF458KJ7~~s4JlDt66JE6Tas6fTafUEEuueEyIFOqS2822aO9yaB3hOoiVa~nsmwmo31fO1D9Ayhe9-ihX0Wg8oIKiXAFdbhG4ZB4LXIQcKTPZBV9lhcu5bjZspUFoI45V19LoBYyX8hEm4pPjtwADDRk7KcqvOOtVUCdg8xJKe74Wmth-V3KAXHsHQzkcD-Jj0G3ftUSLrdBlbqaExtYvGNwsKnp4wyY6kh4Nihpd6lVPmhCa975yaRNRLpKjPxkyfsRV1DJ3q9GiXEwngQwtympQ6C7t6J5GU4JVXuAEOfXsD3SIQWHZS2mnMJEfBo5i7h6CLv493O-6g~~A__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                    "thumb": {
                        "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/16/thumb_healths.png?Expires=1601648232&Signature=BSpCwRq3M1vTJrmTa75gXWLjthLxsmmLSSufTSHL7N3Jcfq3icJfj8p3Q3QyV96wPpdRGcTQxmxVt0z1m66bM4VM738EbalCmv5ec~HIP7zpoZDqyNajZiQczLlVE8y8P56Jtuk6OBN1p~VDTE1cOUGjg5ouI-nOuOUolk6P848FN0Mqv8B4WN5IJu-fUTyqn~lzBSYY0EckpFxxJBKhUvbsaqzh2tmk0LJsnabWNHDgbdJP6xwKrNJEZ9uUAz9251ZiyC1OIGFAxC2sMayezVYpS0OyjPPKuQynTZvBJOVE15TWaITZpxt-VstlSz1QBAj5OHoYJsZ1KI236osoGg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                    }
                },
                "parent_id": null,
                "total_items": 11,
                "sub_categories": [{
                        "id": 18,
                        "name": "Spas & Salons",
                        "code": "spas-salons",
                        "parent_id": 16,
                        "created_at": "2019-10-01T14:27:57.647+05:30",
                        "updated_at": "2020-08-24T16:32:18.287+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/18/massage.png?Expires=1601648232&Signature=aRVnRM6KDDwNDNCTZfkFhTKFrqjHwITmlrLuUVhu53VWGYGK~1sFbjgfgddYf7DbGjoqzD0Lee9IlwRdHcK4KNVJwQzmTeEPPjBtTkmD-7Z1d2xK~ln3mLjJml1M0qMAioJQLe2cc0j0flWz2kYlVqax5n-2ZiJlVPLGgVsYSD5qby4mtnU9szPAzuMuJIIsn5GJdIIx-tlnQLOs38OSL7oTKbUPRgoF9kuOvS-7MAW6QB4MnxAwCEPYCJcemXgpcKhmzbN43AWH22hcWWYl5H8iL2owisJB~eJnEnZ7aTU-7FKR0HtbCLJeCDZ3hskm8BeflgfImxSkSczNqTm69Q__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/18/thumb_massage.png?Expires=1601648232&Signature=j2TCgjNyMJ-SFf6G~0kTAIVXpu6QFCSg3M1s3Y3FuyZZywZgGQReir0wu686vGBdVdl4CvCpRytCg8pUyM4sjnFID6m1tlGwmWjZWE-Dif8vjDXMQPON~BmwxGD9OEXT0qnO723aiIbuXN6mU94uwLXUGFMQWFaMztWUhQOyaWxcn9esVp0cctWqd1t6ZMuAAzhERSYVNntEUjGbgQ0cMuXQ9FWftVOvMvx6ptt8lbfkpQgsv5yj7ZF58z8x4nH08E4hu6MpeZcf~DGKGNjXd6N93G4-dIQGYdFHjOPVvzWECHXJNVgIUA1MD61skUJ0Q8ZsBckMO7JmHsPceXAyag__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 4
                    },
                    {
                        "id": 23,
                        "name": "Healthcare",
                        "code": "healthcare",
                        "parent_id": 16,
                        "created_at": "2019-10-01T14:29:33.898+05:30",
                        "updated_at": "2020-08-30T18:10:28.212+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/23/cardiogram.png?Expires=1601648232&Signature=j8ESGIo0MUhInbY4AmNv2vMOia~psGX9djvbvE6pDJ9n13J5KQvajlgK0miyUUPfZU~qVuiwrwWdb7lUK9~tK8lQ6TU-8BlcKXTdY7fLt7Tv60AKJNr90b0k92D-AoUxcYdothONmWh8w0G593QKtl1LrDmppYD~YnOJURCVnm6HCrSquln3rDKYK-MtHDNOdhtr5miQ7Xwcx6IEMZ8JH6JA~LL34Hh883GyL0fkthZlzApMcWAaJS~gjA-31Q9EVPIxggk6ayWSZV-kyYWKHVjtHQH8jT1eaxNhrD8z1sRLjYdFH7lfxK9jMUAufaKb4IJdKR17uv5qrwiRGntsjg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/23/thumb_cardiogram.png?Expires=1601648232&Signature=PB36TQjmtwyeh3Da7ewAglHN5tXtoS7Xj6PN1wKLTUCzxw~o2V9bS7xo3HHRzEjZ~TIGX7mfKZIoYVo11TqOua-58hTzT0kq5LsI43L700HNQ4LZABio4~14eMvbe3Q9wRdVhabs~Qaz2TtwiYwqN06DUVC-Qui5esL3sdinWuNIW2x-3pzeyY~zZYpjwDbRX1Qv~BtcvANqt0nCbdUVPQiawzq1A4DF2BOJoWAZJRHnNsf6sKNnTI2-AuFTUgnsdIQ4tffVrmdlhQYKBZ3tg9by7h3j4gGmYqRwMsDvmrDGccC2aK8MUa9Jwtm8zEM8r2ICTX2g8wUAT6H3jMByjA__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 4
                    },
                    {
                        "id": 21,
                        "name": "Pharmacies",
                        "code": "pharmacies",
                        "parent_id": 16,
                        "created_at": "2019-10-01T14:28:49.508+05:30",
                        "updated_at": "2020-08-24T16:45:14.423+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/21/medicine.png?Expires=1601648232&Signature=FdAykM3otwdlDJ8pnp2o1lGS5cdg4EDg~HoC8M~TTSLiNOaXcdpOsZ016G8k7DablRqqTVVjgqFl~nOiq~QEgN7Uj5hGV4ObAcFiLyvgYRyOyfR7VRagsZHV4foT1SKBXsOouJMSfdPRUmZdBSj387Bc788Jr2ykb8ZudwjoJkAjOVYVpCP87lpLSfGc1ekBGPnqO0Xt96cs-FKw4--kqY3NrrFtoffbbrieThgK55nok7U-3QI6Jf-Y7Wu0lWvJX0B0oToQYaQYzKlQ0fMa4uvP~4JVEQXXoB3gO5jmYiwknBIiaCQt0ClB7FzIxv64ms7MOD1-PM~lyi7Vzgr6yg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/21/thumb_medicine.png?Expires=1601648232&Signature=Kqi8AohaXBWri0ejSSqyuge6aLLO9~V9ei~O-T9wRbm1pzTP1ZHALvnwM9YLuVmEzQ8954j4qOsGdc02lTSlC-GoZEWega98bPb2MY1zhXXzs9dhdNyCjFJTSajF5EEEkLtLYnZ7O34HNFt4A6dsst6G5nJdeC60PI6~LCZ3hhvNVGbsiEOqypuQSVJfXybnZyuP8~LtHQCw17E-ygOoK6qRxyy8cleFsDIw-o2vgpj-bPRAAUz6LtGgoWbQshyCnu99NNCRHzr~RlnCUmGDyjhRnQ0SugZR9X~4un-jGHS3gO8-Cvbg9QVuLzQB2ImJf7eJyc1QgbdJwWDyMvDaqw__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 3
                    },
                    {
                        "id": 17,
                        "name": "Fitness",
                        "code": "fitness",
                        "parent_id": 16,
                        "created_at": "2019-10-01T14:27:47.096+05:30",
                        "updated_at": "2020-08-24T16:44:20.804+05:30",
                        "logo": {
                            "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/17/lotus.png?Expires=1601648232&Signature=b054G0bmZxAr6DW5ErlAxGhHqZkocIngcQsHH8oMMOkIPwnttpu~Jlj~~ZLiBOxVQ~gI7TORk8fu0-M3iwRmqZPLVGFbnscXY3KvSxsihLa-5RIfuvK6yeFTh-~IiRwckhRHRxYQ5Cp2~pKjezngFLNYmpSrTDka3ufspevusGgeHwW3-W48Qlfb~UgF5qSChWJ90K0EL6~jLGI4Umwj4WcqaCanQdgQOkiLX8AIfumlkBSdZWhOkg0ujqMOrC0NAGAscKplmoWzMRp5ZI3jzMSbl4DldP7oygTWOXMajILH5SBmCW2aH0vic8kWYyDO4UCWvMVJ3CmN8FSFhsk95w__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA",
                            "thumb": {
                                "url": "https://uploads.poshvine.com/uploads/offer_service_models/category/logo/17/thumb_lotus.png?Expires=1601648232&Signature=SJbXHbBAY5rSvW99uVvdCi7Kbg-QPT7YcQZUzibDlFp36uEWyaNdpqy1ZrMsrCACo1U7M4s0~u~prS0oEp4HQj9CbD~5y2jvD4hZT1PB4~exMa0Xkkc2zu5c53MqAsRBnHWKFMofMaVQ1tt3jJECJ9pww0DAV7PgECHnPytTQ8bbPMMay3MV37pR1u6OUWLTzv56gGw-ix78gX09i9Oz~ByOWRK16wlCzwJzpLXto3GxnKjbfEinQk8AJ2CJ1P2RK3j6AkZOd2Erg2nTriioeWtb3MdbhtmuAEgr4LeDOR3woieH7jNotPoGFVKkz0WUytfw~jwGZdQv-hRloTmiTg__&Key-Pair-Id=APKAIRZ6BQDCUY4NRMMA"
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 1
                    },
                    {
                        "id": 22,
                        "name": "Hospitals",
                        "code": "hospitals",
                        "parent_id": 16,
                        "created_at": "2019-10-01T14:29:25.932+05:30",
                        "updated_at": "2019-10-01T14:29:25.932+05:30",
                        "logo": {
                            "url": null,
                            "thumb": {
                                "url": null
                            }
                        },
                        "deleted_at": null,
                        "mapped_to": null,
                        "total_items": 1
                    }
                ]
            }
        }
    ]
}