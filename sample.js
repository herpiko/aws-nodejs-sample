/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/


var key = 'keystring';
var secret = 'secretstring';

var UploadStream = require("s3-stream-upload");
var aws = require("aws-sdk");
var fs = require('fs');

aws.config.update({
  accessKeyId: key, 
  secretAccessKey: secret, 
  endpoint : 'kilatstorage.com'
})

var S3 = aws.S3;
var s3 = new S3();
var key = "file.mp3";

s3.createBucket({
    Bucket: "my-bucket", CreateBucketConfiguration : { LocationConstraint : 'sa-east-1' } 
  }, function(err) {
  if (err) {
    console.log(err);
    process.exit();
  }
  fs.createReadStream(__dirname + "/file.mp3")
    .pipe(UploadStream(s3, { Bucket: "my-bucket", Key: key }))
    .on("error", function (err) {
      console.error(err);
    })
    .on("finish", function () {
      console.log("File uploaded!");
    });
})
