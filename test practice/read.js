var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIAV5I7H3YBA5GRWWAJ", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchOneByKey = function () {
    // var params = {
    //     TableName: "users",
    //     Key: {
    //         "email_id": "example@example.com"
    //     }
    // };
    var params = {
        TableName: "users",
        Key: {
            "email_id": "bhaskar.pranjal@gmail.com"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();