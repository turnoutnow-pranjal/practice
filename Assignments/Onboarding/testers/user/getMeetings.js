const { handler } = require("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/handlers/user/getMeetings");
const { readJSON, writeJSON } = require("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/data/utils");

(async () => {
    const eventData = readJSON("D:/workarea/turnoutnow/github/practice/Assignments/Onboarding/sample/user/getMeetings.json");
    const response = await handler(eventData);
    console.log(JSON.stringify(response));
    // writeJSON("./z_responses/userInfo.json", response);
})();