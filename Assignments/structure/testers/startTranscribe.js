const { TranscribeClient, StartTranscriptionJobCommand } = require("@aws-sdk/client-transcribe");
// const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
// const AWS = require("aws-sdk")
// const s3 = new AWS.S3()
// const fs = require('fs')

// const bucketName = "turnoutnow-onboarding";
// const objectKey = `transcribeAudioTest-4.mp3`
// const fetchObjectKey = "transcribe-pranjal-4.json"
const region = "us-east-1";
var mediaURL="https://test-buck-unique.s3.amazonaws.com/output/spanish.mp3.b595d335-e6ba-435b-86ba-db41c43bf41d.mp3";
// const getStatusInterval=30000



const startTranscriptionRequest = async() =>{
    const input = {
      TranscriptionJobName: "transcribe-esp-pranjal",
      LanguageCode: "es-US",
      Media: {
        MediaFileUri: mediaURL
      },
      OutputBucketName: "turnoutnow-onboarding",
    };
    const transcribeConfig = {
      region
    };
    const transcribeClient = new TranscribeClient(transcribeConfig);
    const transcribeCommand = new StartTranscriptionJobCommand(input);
    try {
      const transcribeResponse = await transcribeClient.send(transcribeCommand);
      console.log("Transcription job created, the details:");
      console.log(transcribeResponse.TranscriptionJob);
    } catch (err) {
      console.log(err);
    }
  }

  startTranscriptionRequest()
  