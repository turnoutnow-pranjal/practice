const fs = require("fs")

let sessData;
let sentData;

const readData = async () => {
    
    try {
        fs.readFile("Assignments/Process sentiment/samples/sessionDetail.json", "utf-8", async (err, data) => {
            if (!err) {
                sessData = await JSON.parse(data)
                fs.readFile("Assignments/Process sentiment/samples/Sentiment_Tracking.json", "utf-8", async (err, data) => {
                    if (!err) {
                        sentData = await JSON.parse(data)
                        processData(sentData, sessData);
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }

};

const processData = async (sent, sess) => {

    for (let activity of sent) {
        // console.log(activity.activityAt);
        for (let session of sess) {
            //     console.log(activity.activityAt>session.startTime)
            if (activity.activityAt >= session.startTime && activity.activityAt <= session.endTime) {
                console.log(session.startTime, "activity:", activity.activityAt, session.endTime)
                activity["GSI1PK"]=`EVENT#${activity.eventId}#SESSION#${session.itemId}`;
                activity["GSI1SK"]=`ACTIVITY#${ activity.activityType.toUpperCase()}#${activity.id}`

            }
        }

    }
    // console.log(sent)
    outputData(sent)
}

const outputData=async(sent)=>{

    fs.writeFile("Assignments/Process sentiment/z-responses/processed.json", JSON.stringify(sent,undefined,2),(err)=>{
        if(!err){
            console.log("Output file generated in: D:/workarea/turnoutnow/github/practice/Assignments/Process sentiment/z-responses/processed.json");
        }
        else{
            console.log(err);
        }
    })

}

(() => {
    readData()
})();

