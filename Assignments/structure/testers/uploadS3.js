const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const AWS = require("aws-sdk")
const s3 = new AWS.S3()
const fs = require('fs')

const bucketName = "turnoutnow-onboarding";
const objectKey = `transcribeAudioTest-4.mp3`
const fetchObjectKey = "transcribe-pranjal-4.json"
const region = "us-east-1";
var mediaURL="https://turnoutnow-onboarding.s3.amazonaws.com/transcribeAudioTest-4.mp3";
const getStatusInterval=30000



const uploadS3Files = async () => {
    const fileContent = fs.readFileSync('./transcribe.mp3')
    const input = {
      Bucket: bucketName,
      Key: objectKey,
      Body: fileContent,
      ContentType: 'audio/mp3'
    }
    s3.upload(input, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        mediaURL=data.Location
        console.log(`Uploaded ${objectKey} at`, data.Location);
      }
    })
  }

  