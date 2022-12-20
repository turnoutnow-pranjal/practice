
const {getMeetingInfo} = require("../../data/user.js");

exports.handler = async(event, context) => {
    // console.log();
    try {
        const {meetingId} = event.arguments;
        // console.log(meetingId);
    
        return await getMeetingInfo(meetingId);
    } catch (error) {
        console.error(error);
        throw error;
    }
};