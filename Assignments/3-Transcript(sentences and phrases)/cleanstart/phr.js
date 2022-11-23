// const str1=require("./op.json")
// const str=require("./es.js")
const fs = require("fs")


const sent = require("./res1.json")
// console.log(sent.sentences);
1
// const modPhrases = () => {
    let s = ""
    let c = 0;
    let startTime = []
    let endTime = []
    for (var i = 0; i < sent.sentences.length; i++) {
        startTime.push(sent.sentences[i].startTime)
        endTime.push(sent.sentences[i].endTime)
        s += `${sent.phrases[i].text} ^${i}^^ `;
    }

    fs.writeFileSync(__dirname + "/eng-phr.txt", JSON.stringify(s), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Done");
        }
    })
// }

let dataa = fs.readFileSync(__dirname + "/fr.eng-phr.txt", "utf-8", (err, data) => {
    if (!err) {
        return JSON.parse(data)
    }
})

console.log(dataa);

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

fs.writeFileSync(__dirname + "/fr-phr-Mod.json", JSON.stringify(arr,null,4), (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Done");
    }
})

// console.log(arr);

