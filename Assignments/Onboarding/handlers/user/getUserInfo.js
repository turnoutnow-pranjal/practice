// require('dotenv').config();
// const AWS_REGION="us-east-1"
// const DYNAMODB_TABLE_NAME="onboarding"


const {getUserInfo} = require("../../data/user.js");

exports.handler = async(event, context) => {
    try {
        const {eventId, userId} = event.arguments;
    
        return await getUserInfo(eventId, userId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};