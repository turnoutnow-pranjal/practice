// require('dotenv').config();

const AWS_REGION="us-east-1"
const DYNAMODB_TABLE_NAME="onboarding"
const {
    DynamoDBClient,
    GetItemCommand,
    // QueryCommand,
    // PutItemCommand,
    // UpdateItemCommand,
    // BatchGetItemCommand
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

let dynamoDbclient;

const initDynamoDBClient = () => {
    if (!dynamoDbclient) {
        dynamoDbclient = new DynamoDBClient({ region: AWS_REGION });
    }
};


exports.getUserInfo = async (eventId, userId) => {
    
    initDynamoDBClient();
    console.log(AWS_REGION);
    const input = {
        TableName: DYNAMODB_TABLE_NAME,
        Key: marshall({
            "PK": `EVENT#${eventId}#USER#${userId}`,
            "SK": `EVENT#${eventId}#USER#${userId}`
        })
    };
    const result = await dynamoDbclient.send(new GetItemCommand(input));
    if (result && result.Item) {
        return unmarshall(result.Item);
    }
};


// exports.getMeetingInfo = async (eventId) => {
    
//     initDynamoDBClient();
//     console.log(AWS_REGION);
//     const input = {
//         TableName: DYNAMODB_TABLE_NAME,
//         Key: marshall({
//             "PK": `EVENT#${eventId}`,
//             "SK": `EVENT#${eventId}`
//         })
//     };
//     const result = await dynamoDbclient.send(new GetItemCommand(input));
//     if (result && result.Item) {
//         return unmarshall(result.Item);
//     }
// };

const getMeetingInfo = async (meetingId) => {
    // console.log(meetingId);
    initDynamoDBClient();
    // console.log(AWS_REGION);
    const input = {
        TableName: DYNAMODB_TABLE_NAME,
        Key: marshall({
            "PK": `MEETING#5pzQIClszCuxhMXU7UbhP`,
            "SK": `MEETING#5pzQIClszCuxhMXU7UbhP`
        })
    };
    console.log(input);
    try {
        const result = await dynamoDbclient.send(new GetItemCommand(input));
        console.log(result);
    // if (result && result.Item) {
    //     // return unmarshall(result);
    // }
    } catch (error) {
        console.log("err",error);
    }
    
};

exports.getUserInfo = async (eventId, userId) => {
    // Initialize DynamoDB client if existing one is not available for reuse
    initDynamoDBClient();
    console.log(AWS_REGION);
    // Set the input parameters
    const input = {
        TableName: DYNAMODB_TABLE_NAME,
        Key: marshall({
            "PK": `EVENT#${eventId}#USER#${userId}`,
            "SK": `EVENT#${eventId}#USER#${userId}`
        })
    };
    // Retrieve the item from DynamoDB
    const result = await dynamoDbclient.send(new GetItemCommand(input));
    if (result && result.Item) {
        return unmarshall(result.Item);
    }
};


exports.getAllMeetings = async (meetingId) => {
    initDynamoDBClient();
    let mIds = meetingId.split(',')
    let keys = []
    for (let x in mIds) {
        // console.log("=++=",mIds[x])
        keys.push(marshall({ "PK": `MEETING#${mIds[x]}`, "SK": `MEETING#${mIds[x]}` }))
    }
    const input = {
        RequestItems: {
            "onboarding": {
                Keys: keys
            },
        }
    };
    try {
        const result = await dynamoDbclient.send(new BatchGetItemCommand(input))
        let res = result.Responses["onboarding"];
        // console.log("res", res);
        let items = [];
        if (res && res) {
            for (let x in res) {
                res[x] = unmarshall(res[x]);
                items.push({ "itemType": "USER", "id": res[x].organizerId, 'eventId': res[x].eventId });
                items.push({ "itemType": "USER", "id": res[x].requiredParticipant.id, 'eventId': res[x].eventId });
                if (res[x].optionalParticipantIds && res[x].optionalParticipantIds.length) {
                    // console.log("&&&&&&&",res[x].optionalParticipantIds)
                    for (let y in res[x].optionalParticipantIds) {
                        items.push({ itemType: "USER", "id": res[x].optionalParticipantIds[y], eventId: res[x].eventId });
                    }
                }
            }
            // console.log();
            keys = [];
            let PKobj = {}
            for (let x in items) {
                let PK = `EVENT#${items[x].eventId}#USER#${items[x].id}`;
                let SK = `EVENT#${items[x].eventId}#USER#${items[x].id}`;
                if (!PKobj[PK]) {
                    keys.push(marshall({ "PK": PK, "SK": SK }));
                    PKobj[PK] = PK
                }
            }
            
            const input1 = {
                RequestItems: {
                    "onboarding": {
                        Keys: keys
                    },
                }
            };
            const result1 = await dynamoDbclient.send(new BatchGetItemCommand(input1))
            var res1 = result1.Responses["onboarding"]
            returnThis=[]
            returnThis.push(res1.map)
            // unmarshall(...result1.Responses["onboarding"]);
            for(let z of res1){
                returnThis.push(unmarshall(z))
            }
            console.log('keys====>', 
            // keys,
            // "inp",input.RequestItems.onboarding.Keys
            returnThis
            )

        }
        // let unm=unmarshall(res1[0]);
        // console.log(unm);
        return returnThis
    } catch (error) {
        console.log("err", error);
    }
    // return keys

}


// (async()=>{
//     let res=await getMeetingInfo("5pzQIClszCuxhMXU7UbhP")
//     console.log(res);
// })()

getMeetingInfo("5pzQIClszCuxhMXU7UbhP")
