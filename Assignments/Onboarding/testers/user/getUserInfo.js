// require('dotenv').config();
// import "../../sample/user/getUserInfo.json"


const { handler } = require("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/handlers/user/getUserInfo");
const { readJSON, writeJSON } = require("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/data/utils");

(async () => {
    const eventData = readJSON("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/sample/user/getUserInfo.json");
    const response = await handler(eventData);
    console.log(JSON.stringify(response));
    // writeJSON("./z_responses/userInfo.json", response);
})();