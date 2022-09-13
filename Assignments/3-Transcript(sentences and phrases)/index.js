const fs=require('fs');


/* passing json data to handler function for creating sentences and phrases arrays that will then be written as o/p on a seperate json file */ 
fs.readFile('./3-Transcript(sentences and phrases)/t.json', 'utf-8',async(err,reads)=>{
    if(err){
        console.log(err);
    }
    else{
        try {
            const data= await JSON.parse(reads);
            dataHandler(data);
            // console.log(data.results.transcripts[0].transcript);
        } catch (error) {
            console.log(error);
        }
    }
});


/*  */
const dataHandler=async(d)=>{
    /* creating arrays of words and listing there start and end times, indexes will match of all three which can be used as reference */
    var startTime=[]
    var endTime=[]
    var words=[]
    for(let i=0;i<d.results.items.length;i++){
        words.push(d.results.items[i].alternatives[0].content)
        startTime.push(d.results.items[i].start_time)
        endTime.push(d.results.items[i].end_time)
    }
    var a=JSON.stringify(d.results.transcripts[0].transcript);
    var arr=(a.split('.'))
    var sen=[]
    var phr=[]
    
    for(let i=0;i<arr.length;i++){
        var sentences={};
        var phrases={};
        var l=arr[i].split(" ");
        if(l.length>8){
            sentences[`text`]=l.join(' ').trim()
            for(let j=0;j<words.length;j++){
                if(l[1]===words[j]){
                    sentences[`startTime`]=startTime[j]
                }
                if(l[l.length-1]===words[j]){
                    sentences[`endTime`]=endTime[j]
                }
            }
        }
        else if(l.length<8 && l.length!==0){
            phrases[`text`]=l.join(' ').trim()
            for(let j=0;j<words.length;j++){
                if(l[1]===words[j]){
                    phrases[`startTime`]=startTime[j]
                }
                if(l[l.length-1]===words[j]){
                    phrases[`endTime`]=endTime[j]
                }
            }
        } 
        sen.push(sentences)
        phr.push(phrases)
    }
    var obj={
        sentences:sen,
        phrases:phr
    }
    

    await fs.writeFile(__dirname+'/res.json',JSON.stringify(obj,undefined,2),(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('File created/written');
            readRes(__dirname+'/res.json')
        }
    });
}

/* to read and clean empty objects in the json file */
const readRes=async(path)=>{
    fs.readFile(path, 'utf-8',async (err,data)=>{
        var read= await JSON.parse(data)
        var sen=[]
        var phr=[]
        for(let i=0;i<read.sentences.length;i++){
            if(read.sentences[i].text!=undefined){
                sen.push(read.sentences[i])
            }
            if(i<read.phrases.length){
                if(read.phrases[i].text!=undefined){
                    phr.push(read.phrases[i])
                }
            }
        }
        var obj={
            sentences:sen,
            phrases:phr
        }
        
    
        await fs.writeFile(__dirname+'/cleaned.json',JSON.stringify(obj,undefined,2),(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Cleaned File created/written');
            }
        });
    })
}

