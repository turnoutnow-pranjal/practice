const algolia=require("algoliasearch")
const client=algolia("IF25VL36F4","eb59e4b803dd76cbd6869e6cbd3444ab")
const index=client.initIndex("testData")

const searchTerm="Luna"

index.search(searchTerm).then(({hits})=>{
    console.log(hits);
}).catch((err)=>{
    console.log(err);
})