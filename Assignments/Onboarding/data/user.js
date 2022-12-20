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

// (async()=>{
//     let res=await getMeetingInfo("5pzQIClszCuxhMXU7UbhP")
//     console.log(res);
// })()

getMeetingInfo("5pzQIClszCuxhMXU7UbhP")
