var stream = require('stream');
const AWS = require('aws-sdk');
const fs = require('fs');

exports.doUpload = (req,res) => {
    var s3Client = new AWS.S3({
        accessKeyId: 'your-keyid',
        secretAccessKey: 'your-secretkey',
        region: 'your-region'
    });

    let bucketName = req.body.containsfaces ? "face-detect-bucket":"no-detect-bucket";

    var params = {
        Bucket: bucketName,
        Key: '', 
        Body: null
    };

    params.Key = req.body.filename;
    params.Body = req.body.file;

    s3Client.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error -> " + err });
        } else {
            res.status(200).json({ data: "data -> " + data });
        }
    });
}
