require('dotenv').config();
const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs");

exports.readJSON = (filename) => JSON.parse(fs.readFileSync(filename, "utf8"));

exports.writeJSON = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data));