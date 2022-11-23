const algolia=require("algoliasearch")
const client=algolia("IF25VL36F4","eb59e4b803dd76cbd6869e6cbd3444ab")
const index=client.initIndex("testData")

const searchTerm="Luna"

index.search(searchTerm).then(({hits})=>{
    // console.log(hits);
    console.log("total results: ",hits.length)
    for (var i=0;i<hits.length;i++){
        console.log(hits[i].name,"-Price: $",hits[i].price);
    }
}).catch((err)=>{
    console.log(err);
})