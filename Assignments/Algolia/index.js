const algolia = require("algoliasearch")
require('dotenv').config();
let searchKey = process.env.SearchKey
const adminKey=process.env.AdminKey
const appId = process.env.APPID

const indexName = "testData"
let searchTerm = "Samsung S22 256GB"
let filterSearchTerm="Samsung"
let filterRule='price>599.99 AND popularity>20000'
// let filterRule='brand:Apple'

let client = algolia(appId, searchKey)
let index = client.initIndex(indexName)

const objArray = [
    {
        objectID:"pranjal-sample-data-159",
        name:"Samsung S22 256GB GREEN Prepaid Cell Phone",
        brand:"Samsung",
        price:1000.02,
        description:"Such a mast phone! Outrageuos camera and outstanding video processing, ekdum gajab! Too poor battery Life though :/",
        categories:["Cell Phones", "Prepaid Phones", "All Prepaid Phones","pranjal"],
        image:"https://images.samsung.com/in/smartphones/galaxy-s22/buy/Samsung_Rewards_PC_2x.jpg?$220_N_JPG$",
        popularity:20001
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

const filteredSearch=()=>{
    
    try {
        index.search(filterSearchTerm,{filters:filterRule}).then(({ hits }) => {
            // console.log(hits);
            console.log("total results: ", hits.length)
            for (var i = 0; i < hits.length; i++) {
                console.log(hits[i].name, "-Price: $", hits[i].price,"Popularity",hits[i].popularity);
            }
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

const pushData=async()=>{
    const client = algolia(appId, adminKey)
    const index = client.initIndex(indexName)
    try {
        await index.saveObjects(objArray)
        .then(({ objectIDs }) => {
          console.log(objectIDs);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
        console.log(error);
    }
}

const updateProperty=()=>{
    
}

const facetSearch=()=>{
    
    try {
        index.search("Galaxy",{
            facets:["name","brand:Samsung"]
            // facets:["*"]

        }).then(({ hits }) => {
            // console.log(hits);
            console.log("total results: ", hits.length)
            for (var i = 0; i < hits.length; i++) {
                console.log(hits[i].name, "-Price: $", hits[i].price,"\n",hits[i].brand);
            }
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

const searchFacetValues=async()=>{
    const client = algolia(appId, adminKey)
    const index = client.initIndex(indexName)
    index.setSettings({
        attributesForFaceting:[
            'brand',
        ]
    }).catch((Err)=>{
        console.log(Err);
    })
    try {
        await index.searchForFacetValues('Cell Phones', {
            filters: 'brand:Samsung'
            // headers: {
            //   'X-Algolia-User-ID': 'user123'
            // }
          }).then(({ facetHits }) => {
            console.log(facetHits);
          });
    } catch (error) {
        console.log(error);
    }
    
}

(
    ()=>{
        // getResults()
        // pushData()
        // filteredSearch()
        // facetSearch()
        // searchFacetValues()
    }

)()

