const algolia = require("algoliasearch")
require('dotenv').config();
let searchKey = process.env.SearchKey
const adminKey=process.env.AdminKey
let appId = process.env.APPID

let indexName = "testData"
const searchTerm = "Samsung S22 256GB"

let client = algolia(appId, searchKey)
let index = client.initIndex(indexName)
const objArray = [
    {
        objectID:"pranjal-sample-data-157",
        name:"Samsung S22 256GB Prepaid Cell Phone",
        brand:"Samsung",
        price:1000.99,
        description:"Such a mast phone! Outrageuos camera and outstanding video processing, ekdum gajab! Too poor battery Life though :/",
        categories:["Cell Phones", "Prepaid Phones", "All Prepaid Phones"],
        image:"https://images.samsung.com/in/smartphones/galaxy-s22/buy/Samsung_Rewards_PC_2x.jpg?$220_N_JPG$",
        popularity:20000
    }
]

const getResults = () => {

    try {
        index.search(searchTerm).then(({ hits }) => {
            // console.log(hits);
            console.log("total results: ", hits.length)
            for (var i = 0; i < hits.length; i++) {
                console.log(hits[i].name, "-Price: $", hits[i].price);
            }
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }

}

const pushData=()=>{
    const client = algolia(appId, adminKey)
    const index = client.initIndex(indexName)
    try {
        index.saveObjects(objArray)
        .then(({ objectIDs }) => {
          console.log(objectIDs);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
        
    }
}

(
    ()=>{
        getResults()
        // pushData()

    }
)()

