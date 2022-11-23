const { TranslateClient, StartTextTranslationJobCommand } = require('@aws-sdk/client-translate');

const translateInput = {
    S3Uri:"s3://turnoutnow-onboarding/pranjal/input/",
    ContentType:"text/plain"
}


const startTextTranslationRequest = async () => {
    const input = {
        JobName: "translate-Pranjal-1",
        InputDataConfig: translateInput,
        OutputDataConfig: {S3Uri:"s3://turnoutnow-onboarding/pranjal/output/"},
        SourceLanguageCode: "en",
        TargetLanguageCodes: ["es"],
        DataAccessRoleArn:"arn:aws:iam::711974519606:role/translate-batch-role"
    }
   
    const client = new TranslateClient();
    const command = new StartTextTranslationJobCommand(input);
    const response = await client.send(command);
    console.log(response);

}
startTextTranslationRequest()
