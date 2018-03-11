'use strict';

//node modules
const crypto = require('crypto'),
    path = require('path'),
    fs = require('fs'),
    S3FS = require('s3fs');

const config = require('../../config.js');
const NEEDED_PARAMS = [
  "AWS_BUCKET",
  "AWS_ID",
  "AWS_SECRET",
  "S3_BUCKET_URL",
];

var s3fsImpl = new S3FS(global.AWS_BUCKET, {
    accessKeyId: global.AWS_ID,
    secretAccessKey: global.AWS_SECRET
});

s3fsImpl.create();

function Upload(){};

Upload.file = function(file, filename, cb){
  crypto.randomBytes(48, function(ex, buf){
    let hex = buf.toString('hex'),
      originalFilename = file.name,
      filePath =  hex + path.extname(originalFilename);
      s3fsImpl.writeFile('/' +filePath, file.data, {"ContentType": (file.mimetype)}).then(function (e) {
      let s3Link = global.S3_BUCKET_URL + '/' + filePath; 
      cb(s3Link);
    });
  });
};


module.exports = Upload;