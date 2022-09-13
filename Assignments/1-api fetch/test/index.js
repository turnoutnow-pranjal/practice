import fs from "fs";
import express from "express";
// const { title } = require('process');
const app=express();
const PORT=8080;
app.use(express())
import axios from 'axios';


const URL="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl"
const key="u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl"
var datev;
var titlev;
var countv;

fs.readFile('./request.json',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{

        var json=JSON.parse(data)
        for(var date in json){
            datev=date;
            // console.log(datev);
            for(var title in json[date]){
                // console.log(title);
                titlev=title;
                countv=json[date][title]
                // console.log(json[date][title])
                console.log(datev,titlev,countv);
                app.get('/', async(req,res)=>{
                    // let name=req.params.name
                    // console.log(name)
                
                    try {
                        const resData=await axios.get(URL);
                        // console.log(resData.data.results)
                        res.status(200).send({result:resData.data.results})
                    } catch (er) {
                        console.log(er,er.response)
                    }
                })
                
            }
        }
    }
})

// fetch("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?a pi-key=u3f3dHTaqMXEVLxtejbapNtRN6bhS2kl").then((res)=>
//     res.json()
// ).then((data)=>
//     console.log(data)
// )



app.listen(PORT,()=>{
    console.log(`listening on Port: ${PORT}`);
})