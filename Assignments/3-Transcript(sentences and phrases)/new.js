const { count } = require('console');
const fs = require('fs')

fs.readFile('./t.json', 'utf-8', async (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        try {
            const jdata = await JSON.parse(data);
            dataHandler(jdata);
            // console.log(jdata);
        } catch (error) {
            console.log(error);
        }
    }
})

const dataHandler = async (d) => {
    // console.log(d);
    var chars = [];
    var stTime = [];
    var enTime = [];
    for (let i = 0; i < d.results.items.length; i++) {
        chars.push(d.results.items[i].alternatives[0].content);
        stTime.push(d.results.items[i].start_time)
        enTime.push(d.results.items[i].end_time)
    }
    // console.log(chars.length,stTime.length,enTime.length);

    var sentSt = []
    var sentEnd = []
    var sentences = []
    for (let i = 0; i < chars.length; i++) {
        if (i == 0 || chars[i] == '.') {
            sentSt.push(stTime[i + 1])
        }
        if (chars[i + 1] == '.') {
            sentEnd.push(enTime[i])
        }
    }
    sentences = d.results.transcripts[0].transcript.split('.')
    // console.log(sentences);
    // console.log(sentences.length, sentSt.length, sentEnd.length);
    var sents = []
    for (let i = 0; i < sentences.length; i++) {
        var obj = {}
        obj[`text`] = sentences[i].trim() + '.'
        obj[`startTime`] = sentSt[i];
        obj[`endTime`] = sentEnd[i]
        sents.push(obj)
    }
    // console.log(sents);
    // console.log(chars);
    var str = ''
    var phrs = []
    var c = 0;
    var cp = 0
    var phrsE = []
    var phrsS = []
    phrsS.push(0)
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] !== '.' && c < 8) {
            str += chars[i] + ' '
            c++
            cp++
        }
        else {
            phrsS.push(cp + 1)
            phrs.push(str)
            str = ''
            phrsE.push(cp)
            c = 0
        }
    }
    console.log(phrsS.length, phrsE.length, phrs.length);
    var phrases = []
    for (let i = 0; i < phrs.length; i++) {
        var obj = {}
        obj[`text`] = phrs[i].trim()
        obj[`startTime`] = stTime[phrsS[i]]
        obj[`endTime`] = enTime[phrsE[i]]
        phrases.push(obj)
    }
    var obj = {
        sentences: sents,
        phrases: phrases
    }
    // writeResult(obj)

}

const writeResult = async (obj1) => {
    fs.writeFile(__dirname + '/res.json', JSON.stringify(obj1, undefined, 2), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`Out-Put File created/written in ${__dirname}`);
        }
    });
}

let obj = { eventId:olVYX2q4SOBUScjFVCGhx, 
    notes:{ RokWBxC0r_IQrld6fF2Sx:{ createdAt:2022 - 07 - 27T08: 23: 32.755Z, noteId:RokWBxC0r_IQrld6fF2Sx, content:test, createdById:12884602 }, VoUPUHAiWr45DHG2h7- E_:{ createdAt : 2022 - 07 - 27T12:36:07.356Z, noteId : VoUPUHAiWr45DHG2h7 - E_, content : declining, createdById : 8140810 }}, 
    lastActionAt : 2022 - 07 - 27T12: 36: 07.356Z, 
    requiredParticipant : { itemType:USER, id:8140810 }, 
    declinedBy : 8140810, 
    meetingId :20_FbPDlnJ0QXgLJk7G9p, 
    type : Meeting, 
    title : test meeting request AUG 14 - 1pm, 
    createdAt : 2022 - 07 - 27T08: 23: 32.755Z, 
    lastActionById : 8140810, 
    organizerId : 12884602, 
    GSI1PK : EVENT#olVYX2q4SOBUScjFVCGhx#MEETING, 
    GSI1SK : CANCELED#20_FbPDlnJ0QXgLJk7G9p, 
    SK : MEETING#20_FbPDlnJ0QXgLJk7G9p, 
    location : { code:3rdPartyVirtualMeeting, name:Meet Virtually Online, value:"https://web.zoom.us"}, 
    startTime:2022-08-14T07:30:00.000Z, 
    endTime:2022-08-14T07:45:00.000Z, 
    PK:MEETING#20_FbPDlnJ0QXgLJk7G9p, 
    optionalParticipantIds:[14960771], 
    lastActionType:DECLINE, 
    participants:{14960771:CANCELED, 12884602:CANCELED, 8140810:CANCELED}, status:CANCELED, 
    updatedAt:2022-07-27T12:36:07.356Z}







// var c = 1
//     var arr1 = []
//     var s = '';
//     var phrStart=[];
//     var phrEnd=[];

//     for (var i = 0; i < chars.length; i++) {
//         // console.log(chars[i]);
//         if(c==1){
//             phrStart.push(stTime[i])
//         }
//         // if(c==8||i==chars.length-1)
//         if (c < 9 && chars[i]!=='.') {
//             s += chars[i] + ' '
//             // console.log(i, "if", c);
//             c++;

//         }
//         if (c > 8 || i == (chars.length - 1)) {
//             arr1.push(s.trim())
//             console.log(s);
//             // console.log(i, "else", c);
//             c = 1
//             s = ''
//             // continue;
//         }
//     }
//     console.log(arr1);