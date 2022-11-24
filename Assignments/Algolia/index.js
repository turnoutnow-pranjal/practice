const algolia=require("algoliasearch")
require('dotenv').config();
let searchKey=process.env.SearchKey
let appId=process.env.APPID

let indexName="testData"
const searchTerm="Luna"

const client=algolia(appId,searchKey)
const index=client.initIndex(indexName)

const getResults=()=>{
    index.search(searchTerm).then(({hits})=>{
        // console.log(hits);
        console.log("total results: ",hits.length)
        for (var i=0;i<hits.length;i++){
            console.log(hits[i].name,"-Price: $",hits[i].price);
        }
    }).catch((err)=>{
        console.log(err);
    })
}

getResults()