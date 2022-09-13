const fs = require('fs');


/*to read the json file, create required fields' arrays, use them as reference to create sentences objects with start - end time-stamps*/
fs.readFile('./3-Transcript(sentences and phrases)/t.json', 'utf-8', async (err, resp) => {
    if (err) {
        console.log(err);
    }
    else {
        try {
            const data = await JSON.parse(resp);
            /* to collect total words and their timings to further filter the start and end words and their respective start end timings*/
            var startTime = []
            var endTime = []
            var chars = []
            for (let i = 0; i < data.results.items.length; i++) {
                chars.push(data.results.items[i].alternatives[0].content)
                startTime.push(data.results.items[i].start_time)
                endTime.push(data.results.items[i].end_time)
            }


            /* sperating start-end timings of start-end words only which will be used to map values to object containg startTime and endTime keys */
            var start = []
            var end = []
            for (let i = 0; i < chars.length; i++) {                
                var str = '';
                if (i == 0) {
                    start.push(startTime[i])
                }
                if (chars[i + 1] == '.') {
                    end.push(endTime[i])
                }
                if (chars[i] == '.') {
                    start.push(startTime[i + 1])
                }
            }
            // var ph=0
            var phr=[]
            var arr=[]
            var arrst=[]
            var arren=[]
            var phrst=[]
            var phren=[]
            for(let i=0;i<chars.length;i++){
                
                if(chars[i]!=='.'){
                    arr.push(chars[i])
                    arrst.push(startTime[i])
                    arren.push(endTime[i])
                }
                else if(chars[i]=='.'){
                    phr.push(arr);
                    phrst.push(arrst)
                    phren.push(arren)
                    arr=[]
                    arrst=[]
                    arren=[]
                }
                
            }
            // console.log(phr.length, phren.length,phrst.length);
            var phrase=[];
            var phrases=[]
            var startPhrase=[];
            var endPhrase=[];
            // var 
            for(let i=0;i<phr.length;i++){
                // if(phr[i].length<8){
                //     phrases.push(phr[i].join(' '))
                //     startPhrase.push(phrst[i][0])
                //     endPhrase.push(phren[i][phren[i].length-1])
                // }
                // else{
                    var str='';
                    var c=1;
                    var arr=[]
                    for(let j=0;j<phr[i].length;j++){
                        if(c<9){
                            str+=phr[i][j]+' ';
                            c++
                            // console.log(phr[i][j]);
                            if(c==1){
                                startPhrase.push(phrst[i])
                            }
                            else if(c==8 || j==phr[i].length-1){
                                endPhrase.push(phren[i][phren[i].length-1])
                            }
                        }
                        if(c>8 || j==phr[i].length-1){
                            phrases.push(str.trim());
                            c=1;
                            str=''
                        }
                    }
                    // phrases.push(arr)
                // }
            }
            // console.log(phrases.length,startPhrase.length,endPhrase.length);
            // console.log(phrases,startPhrase,endPhrase);
            // console.log(chars,startTime,endTime);
            /* separating every sentence for "text:value" in the initial object */
            var arr = data.results.transcripts[0].transcript.split('.');

            /* creating sentence array of objects with start end timings which will be passed to function seperatePhrases that will separate phrases objects from sentences array of objects */
            var sentences = []
            var p=[]
            // console.log(arr.length);

            console.log(phrases);
            for (let i = 0; i < arr.length; i++) {
                var obj = {}
                obj[`text`] = arr[i].trim()+'.'
                obj[`startTime`] = start[i]
                obj[`endTime`] = end[i]
                sentences.push(obj)
            }
            for (let i = 0; i < phrases.length; i++) {
                // console.log(startPhrase[i]);
                var obj = {}
                obj[`text`] = phrases[i].trim()
                obj[`startTime`] = startPhrase[i]
                obj[`endTime`] = endPhrase[i]
                p.push(obj)
            }
            let obj1 = {
                sentences: sentences,
                phrases:p
            }
            // console.log(obj1);
            seperatePhrases(obj1)
        } catch (error) {
            console.log(error);
        }
    }
})

const seperatePhrases = async (d) => {
    // var sentences = []
    // var phrases = []
    // for (var i = 0; i < d.sentences.length; i++) {
    //     if (d.sentences[i].text.split(' ').length > 7) {
    //         sentences.push(d.sentences[i])
    //     }
    //     else {
    //         phrases.push(d.sentences[i])
    //     }
    // }
    // var obj = {
    //     sentences: sentences,
    //     phrases: phrases
    // }
    writeObj(d);
}

const writeObj = async (obj1) => {
    fs.writeFile(__dirname + '/res.json', JSON.stringify(obj1, undefined, 2), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Out-Put File created/written in ${__dirname}`);
        }
    });
}