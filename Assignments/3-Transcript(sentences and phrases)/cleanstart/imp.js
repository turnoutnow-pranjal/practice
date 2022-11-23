// const str1=require("./op.json")
// const str=require("./es.js")
const fs = require("fs")
// let content;
// fs.readFile(__dirname+"/unmodif.txt","utf-8",(err,data)=>{
//     if(!err){
//         try {
//             const content=JSON.parse(data)
//             handleData(content)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     else{
//         console.log(err);
//     }
// })

// const handleData=async(data)=>{
//     console.log(data);
// }

// console.log(content);



// for(var i=0;i<)
// console.log(s);

// console.log(str1.results.transcripts[0].transcript.split(".").length);

// console.log("string: ",str);


// let dataa=fs.readFileSync(__dirname+"/unmodif.txt","utf-8",(err,data)=>{
//     if(!err){
//         return JSON.parse(data)
//     }
// })

// console.log(dataa);

// var f="";
// var c=0
// for(var i=0;i<dataa.length;i++){
//     if(dataa[i+1]==='.'){
//         c++
//         f+=dataa[i]+` <p translate=no>fullStopNumber:${c}</p>`
//     }
//     else{
//         f+=dataa[i]
//     }
// }
// console.log(f);
// fs.writeFileSync(__dirname+"/modf.txt", f, (err)=>{
//     if(!err){
//         console.log("File Written");
//     }
//     else{
//         console.log("Kuchh garbar");
//     }
// })

const sent = require("./res1.json")
// console.log(sent.sentences);

let s = ""
let c = 0;
let startTime = []
let endTime = []
for (var i = 0; i < sent.sentences.length; i++) {
    startTime.push(sent.sentences[i].startTime)
    endTime.push(sent.sentences[i].endTime)
    s += `${sent.sentences[i].text.split('.')[0]} ^${i}. `;
}

fs.writeFileSync(__dirname + "/modified-1.txt", JSON.stringify(s), (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Done");
    }
})

// const a=" And today I'll be joined by Michael Riccardi, who's our specialist development solutions architect ^2. Today ^3. We're really excited to be here to show you how purpose built databases could be used to improve the scale performance and availability of your applications for our agenda will have an introduction of the requirements from a modern day applications ^4.";

// const a = require("d:/workarea/turnoutnow/github/practice/Assignments/3-Transcript(sentences and phrases)/cleanstart/fr.modified-1.txt")
// console.log(a);

let dataa = fs.readFileSync(__dirname + "/fr.modified-1.txt", "utf-8", (err, data) => {
    if (!err) {
        return JSON.parse(data)
    }
})

// console.log(dataa);

var arr = []
var sen = ""
var ss = dataa.split('.')


// console.log(ss[0].split('^')[1]===undefined);
var obj
var i=0;
for (var i = 0; i < ss.length; i++) {
    if(ss[i].split('^')[1]){
        var n=ss[i].split('^')[1]
    }
    console.log(startTime[n]);
    obj = {
        sent: ss[i].split('^')[0].trim() + '.',
        startTime: ss[i].split('^')[1]?startTime[ss[i].split('^')[1]]:startTime[n],
        endTime: ss[i].split('^')[1]?endTime[ss[i].split('^')[1]]:endTime[n]
    }
    arr.push(obj)
}

fs.writeFileSync(__dirname + "/frMod.json", JSON.stringify(arr,null,4), (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Done");
    }
})
// console.log(startTime[startTime.length-1]);

// console.log(arr);

