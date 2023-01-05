// /**
//  * Available AppSync utilities that you can use in your request and response handler.
//  */
// import { util } from '@aws-appsync/utils';

// /**
//  * Handles an incoming request and converts it into a request object for the
//  * selected data source operation.
//  * Find code samples at https://github.com/aws-samples/aws-appsync-resolver-samples
//  * @param ctx contextual information for your resolver invocation
//  * @returns a data source request object
//  */
// export function request(ctx) {
//     // console.log('inputctx',ctx.args );
//   return dynamoDBGetItemRequest({ PK: `MEETING#${ctx.args.meetingId}` , SK: `MEETING#${ctx.args.meetingId}` });
// }

// export function response(ctx) {
//     //  console.log(`ctx.result --> ${JSON.stringify( ctx.result)}`);
//      const { error, result } = ctx;
//       if (error) {
//         if (!ctx.stash.errors) ctx.stash.errors = []
//         ctx.stash.errors.push(ctx.error)
//         return util.appendError(error.message, error.type, result);
//       }
  
//      let items = [];
//      let meeting = ctx.result;
//     if(ctx.result){
//         items.push({"itemType" : "USER", "id" : ctx.result.organizerId});
//         items.push({"itemType" : "USER", "id" : ctx.result.requiredParticipant.id});
//         if( ctx.result.optionalParticipantIds && ctx.result.optionalParticipantIds.length){
//             for(const partId of ctx.result.optionalParticipantIds){
//                 items.push({"itemType" : "USER", "id" : partId});
//             }
//         }
//         ctx.stash["items"] = items;
        
//         // console.log(`meeting.notes --> ${JSON.stringify(meeting.notes)} and ${Object.values(meeting.notes)}`);
        
//          let notes = [];
//          if(meeting.notes){
//              for(let note of Object.values(meeting.notes)){
//                 notes.push(note);
//             }
//          }
         
//         //  console.log("!@#",meeting.eventId,meeting.requiredParticipant.id)
//         let key={
//             PK : `EVENT#${meeting.eventId}#USER#${meeting.requiredParticipant.id}`,
//             SK : `EVENT#${meeting.eventId}#USER#${meeting.requiredParticipant.id}`
//         }
//         meeting["keys"]=key
//         meeting["notes"] = notes;
//         ctx.stash["meeting"] = meeting;
//     }
//     // console.log("!@#+++",meeting)
    
//     // console.log(`resultmeeting --> ${JSON.stringify(meeting)}`);
    
//     return ctx.stash.meeting;
// }

// /**
//  * A helper function to get a DynamoDB item
//  */
// function dynamoDBGetItemRequest(key) {
//   return {
//     operation: 'GetItem',
//     key: util.dynamodb.toMapValues(key),
//   };
// }


// /**
//  * Available AppSync utilities that you can use in your request and response handler.
//  */
// import { util } from '@aws-appsync/utils';

// /**
//  * Handles an incoming request and converts it into a request object for the
//  * selected data source operation.
//  * Find code samples at https://github.com/aws-samples/aws-appsync-resolver-samples
//  * @param ctx contextual information for your resolver invocation
//  * @returns a data source request object
//  */
// export function request(ctx) {
//     const {eventId}=ctx.stash.meeting
//     // console.log("requestTest",eventId,ctx.stash)
//     // let PK=util.dynamodb.toString(ctx.prev.result.keys.PK)
//     // let SK=util.dynamodb.toString(ctx.prev.result.keys.SK)
//     let keys=[]
//     for (let x of ctx.stash.items) {
//             let PK = util.dynamodb.toString(`EVENT#${eventId}#USER#${x.id}`)
//             let SK = util.dynamodb.toString(`EVENT#${eventId}#USER#${x.id}`)
//             keys.push({PK:PK,SK:SK})
//         }
    
//     return ddbBatchGet(keys);
// }

// function ddbBatchGet(keys){
//     return {
//      operation: 'BatchGetItem',
//      tables: {
//       "onboarding": {
//             "keys": keys,
//          }
//      }
//     }
// }

// /**
//  * Handles the response from your data source.
//  * Find code samples at https://github.com/aws-samples/aws-appsync-resolver-samples
//  * @param ctx contextual information for your resolver invocation
//  * @returns a result that is passed to the next function, or the response handler of the pipeline resolver
//  */
// export function response(ctx) {
//     const { error, result } = ctx;
//     if (error) {
//         if (!ctx.stash.errors) ctx.stash.errors = []
//         ctx.stash.errors.push(ctx.error)
//         return util.appendError(error.message, error.type, result);
//     }
//     // console.log("responseTest",ctx.result.data.onboarding,"2ndIndex",[ctx.result.data.onboarding[2]])
//     // let arr=[]
//     // for(var i=2;i<ctx.result.data.onboarding;i++){
//     //     arr.push(ctx.result.data.onboarding[i])
//     // }
    
//     ctx.stash["meeting"]["organizer"] = ctx.result.data.onboarding[0];
//     ctx.stash["meeting"]["requiredParticipant"]=ctx.result.data.onboarding[1];
//     ctx.stash["meeting"]["optionalParticipants"]=ctx.result.data.onboarding.splice(0,2);
//     console.log("stashNew",ctx.stash.meeting)
    
//     return ctx.stash.meeting;
// }


// "type": "SentimentTracking",
// "eventId": `${ctx.request.headers.eventid}`,
// "userId": `${ctx.request.headers.userId}`,
// "itemType": `${ctx.args.itemType}`,
// "itemId": `${ctx.args.itemId}`,
// "activityId": `${activityId}`,            
// "activityType": `${ctx.args.activityType}`,
// "timeStamp": `${ctx.args.timeStamp}`,
// "activityAt": `${util.time.nowISO8601()}`

// let a=Date.getUTCSeconds("2022-12-28T11:00:00Z")

// console.log(a);

// var date = new Date("2015-08-25T15:35:58.000Z");
// var seconds = date.getTime()
// console.log()

// {
//     "PK": "EVENT#st6GLdflwQAvXqVbEBhlX#SESSION#43225",
//     "SK": "EVENT#st6GLdflwQAvXqVbEBhlX#SESSION#43225",
//     "endTime": "2022-12-28T11:00:00Z",
//     "eventId": "st6GLdflwQAvXqVbEBhlX",
//     "id": "43225",
//     "startTime": "2022-12-28T10:00:00Z",
//     "type": "SESSION"
// }

var date = new Date(1672225200000-300000);
var mseconds = date.toUTCString()
console.log(mseconds);
// let newDate= new Date(mseconds)

// let b= new Date(mseconds)
// let a=''+mseconds
// console.log(b.getUTCDate());








// WEKnwz3I47vC8Q8C9B7rW
// 272AdYllC5jDFVDGIKoNu
// tCGUJNI7xttYs7AfjVGuJ
// Q0CSyRYaPoIoXb04WqehJ
// JHOzZTU2Hc4daBnRUu20N
// XFgsAVap3rXnYt90Hfhju
// 6Di1hSb1b9YShyuc8K1Nk
// 8NLyooeQX3xhNdLTAJCrM
// QvzXhk3CaBoE5OQDn1WtA
// pUDAB5PIIK9s0wawkVuF3
// B3txOdpW2ezr7mnD7LKfN