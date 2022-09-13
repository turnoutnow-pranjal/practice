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

            /* separating every sentence for "text:value" in the initial object */
            var arr = data.results.transcripts[0].transcript.split('.');

            /* creating sentence array of objects with start end timings which will be passed to function seperatePhrases that will separate phrases objects from sentences array of objects */
            var sentences = []
            for (let i = 0; i < arr.length; i++) {
                var obj = {}
                obj[`text`] = arr[i].trim()+'.'
                obj[`startTime`] = start[i]
                obj[`endTime`] = end[i]
                sentences.push(obj)
            }

            let obj1 = {
                sentences: sentences,
                phrases: []
            }
            seperatePhrases(obj1)
        } catch (error) {
            console.log(error);
        }
    }
})

const seperatePhrases = async (d) => {
    var sentences = []
    var phrases = []
    for (var i = 0; i < d.sentences.length; i++) {
        if (d.sentences[i].text.split(' ').length > 7) {
            sentences.push(d.sentences[i])
        }
        else {
            phrases.push(d.sentences[i])
        }
    }
    var obj = {
        sentences: sentences,
        phrases: phrases
    }
    writeObj(obj);
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