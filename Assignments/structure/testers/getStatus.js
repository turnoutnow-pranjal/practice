// const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
// const AWS = require("aws-sdk")
// const s3 = new AWS.S3()
const fs = require('fs')

const bucketName = "turnoutnow-onboarding";
// const objectKey = `transcribeAudioTest-4.mp3`
const fetchObjectKey = "transcribe-esp-1.json"
// const region = "us-east-1";
// var mediaURL="https://turnoutnow-onboarding.s3.amazonaws.com/transcribeAudioTest-4.mp3";
const getStatusInterval=30000





const getStatus = async () => {
  
    const fetchTextFile = async (bucketName, objectKey) => {
      var errorFound = false;
      
      try {
        
        const getFileObjectFromS3 = async (bucket, key) => {
          const params = {
            Bucket: bucket,
            Key: key
          };
  
          const getObjectCommand = new GetObjectCommand(params);
          const s3Client = new S3Client();
          
          try {
            const s3Response = await s3Client.send(getObjectCommand);
            return s3Response;
          } catch (error) {
            console.log(`Error while fetching Operation JSON from S3 for ${key}`, error);
            return error
          }
  
        };
        const objectData = await getFileObjectFromS3(bucketName, objectKey);
        const streamToString = (stream) =>
          new Promise((resolve, reject) => {
            const chunks = [];
            stream.on("data", (chunk) => chunks.push(chunk));
            stream.on("error", reject);
            stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
          });
        return await streamToString(objectData.Body);
      } catch (error) {
        errorFound = true;
        return errorFound
      }
    };
    let fileContent = await fetchTextFile(bucketName, fetchObjectKey);
    // console.log("filecontent",fileContent);
    var c = 1
    const checkBucket = async () => {
      if (fileContent === true) {
        fileContent = await fetchTextFile(bucketName, fetchObjectKey);
        console.log(c++);
      }
      else {
        let file = JSON.parse(fileContent)
        fs.writeFile("./transcribeOP.json", JSON.stringify(file,null,4), () => {
          console.log("done");
        })
        clearInterval(exec)
      }
    }
    var exec = setInterval(checkBucket, getStatusInterval);
  }

  getStatus()