const { TranslateClient, StartTextTranslationJobCommand } = require('@aws-sdk/client-translate');

const translateInput = {
    S3Uri:"s3://turnoutnow-onboarding/pranjal/input/",
    ContentType:"text/plain"
}


// startTextTranslationJob()

// const client=new Transl ateClient()
// const translate = new AWS.Translate(
//     {
//         accessKeyId: 'AKIAV5I7H3YBMT7SE5OM',
//         secretAccessKey: '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',
//         region: 'us-east-1'
//     }
// )
const startTextTranslationRequest = async () => {
    
    const input = {
        JobName: "phrases-2",
        InputDataConfig: translateInput,
        OutputDataConfig: {S3Uri:"s3://turnoutnow-onboarding/pranjal/output/"},
        SourceLanguageCode: "en",
        TargetLanguageCodes: ["fr"],
        DataAccessRoleArn:"arn:aws:iam::711974519606:role/translate-batch-role"
    }
   
    const client = new TranslateClient();
    const command = new StartTextTranslationJobCommand(input);
    const response = await client.send(command);
    console.log(response);

}
startTextTranslationRequest()

// fs.stat('./transcribeOP.json', (err,res)={
//     console.log(res);
// })

// console.log(Buffer.byteLength(translateInput));
// translateThis()

// F30342585