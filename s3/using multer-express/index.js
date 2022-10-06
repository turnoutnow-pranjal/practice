require('dotenv').config()
const express=require('express');
const app=express();
const aws=require('aws-sdk');
const multer=require('multer')
const multerS3=require('multer-s3');
const { access } = require('fs');
// const PORT=process.env.PORT;
const PORT=process.env.PORT || 8080;

aws.config.update({
    secretAccessKey:process.env.ACCESS_SECRET,
    accessKeyId:process.env.ACCESS_KEY,
    region: process.env.REGION
})

const BUCKET = process.env.BUCKET
const s3 = new aws.S3();


const upload=multer({
    storage:multerS3({
        bucket:BUCKET,
        s3:s3,
        acl:"public-read",
        key:(req,file,func)=>{

            func(null,file.originalname);

        }
    })
})

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.send('Uploaded!'+req.file.location+' location')
})


app.get('/list',async(req,res)=>{
    let resp=await s3.listObjectsV2({Bucket:BUCKET}).promise();
    console.log(resp,"RESP");
    let result=resp.Contents.map(el=>el.Key)
    res.send(result)
    
})

app.get('/download/:fileName',async(req,res)=>{
    const fileName=req.params.fileName;

    let resp=await s3.getObject({Bucket:BUCKET, Key:fileName}).promise();
    res.send(resp.Body);
})

app.delete('/delete/:fileName', async(req,res)=>{
    const fileName=req.params.fileName;
    await s3.deleteObject({Bucket:BUCKET, Key:fileName}).promise();
    res.send(`Woosh!! ${fileName} is Deleted!`)
})

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})
