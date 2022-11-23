const fs=require('fs')

fs.readFile("./transcribe-pranjal.json",async(err,data)=>{
    if(!err){
        try {
            const content=JSON.parse(data)
            handleData(content)
        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log(err);
    }
})

const handleData=async(d)=>{
    var chars=[]
    var allStart=[]
    var allEnd=[]
    for(let i=0;i<d.results.items.length;i++){
        chars.push(d.results.items[i].alternatives[0].content)
        allEnd.push(d.results.items[i].end_time)
        allStart.push(d.results.items[i].start_time)
    }
    var sents=d.results.transcripts[0].transcript.split('. ')
    var sentSt=[]
    sentSt.push(allStart[0])
    var sentEn=[]
    for(let i=0;i<chars.length;i++){
        if(chars[i]=='.'){
            sentSt.push(allStart[i+1])
        }
        if(chars[i+1]=='.'){
            sentEn.push(allEnd[i])
        }
    }

    var sentencesArr=[]
    for(let i=0;i<sents.length;i++){
        var obj={}
        obj[`text`]=sents[i]+'.';
        obj[`startTime`]=parseFloat(sentSt[i]);
        obj[`endTime`]=parseFloat(sentEn[i])
        sentencesArr.push(obj)
    }

    var c=1
    var k=0
    var str=''
    var phrasess=[]
    var phrasesEnd=[]
    var phrasesSt=[]
    phrasesSt.push(allStart[0])
    for(let i=0;i<chars.length;i++){
        if(chars[i]!=='.' && c<8){
            str+=chars[i]+' '
            c++;
            k++;
        }
        else{
            phrasess.push(str.trim())
            str=''
            c=0
            if(chars[k]=='.'){
                phrasesSt.push(allStart[k+1]);
                phrasesEnd.push(allEnd[k-1])
            }
            else{
                phrasesSt.push(allStart[k]);
                phrasesEnd.push(allEnd[k-1])
            }
            k++;
        }
    }
    var phrasesArr=[]
    for(let i=0;i<phrasess.length;i++){
        let obj={}
        obj[`text`]=phrasess[i]
        obj[`startTime`]=parseFloat(phrasesSt[i])
        obj[`endTime`]=parseFloat(phrasesEnd[i])
        phrasesArr.push(obj)
    }
    var obj={
        sentences:sentencesArr,
        phrases:phrasesArr
    }
    writeRes(obj)
}


const writeRes=(obj)=>{
    fs.writeFile(__dirname+'/res1.json',JSON.stringify(obj,undefined,2),(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(`Result file created/over-written in ${__dirname}`);
        }
    });
}
