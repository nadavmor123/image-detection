var stream = require('stream');
const AWS = require('aws-sdk');
//const fr = require('face-recognition')

const s3 = require('../config/s3.config.js');

exports.detectFace = (imageName, res) => {

    var rekognition = new AWS.Rekognition({
        region: 'us-east-2',
        apiVersion: '2016-06-27',
        credentials: {
            accessKeyId: 'AKIAT2MVAPEYCZ24V3IM',
            secretAccessKey: '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'
        }
    });

    var params = {
        Image: {
            S3Object: {
                Bucket: "face-detect-bucket",
                Name: imageName
            }
        }
    };

    rekognition.detectFaces(params, function(err, data) {
        if (err)
            res.json({ message: err });
        else
            res.json({ message: data });
    });
}

exports.doUpload = (stream, fileName, res) => {
    var s3Client = new AWS.S3({
        accessKeyId: 'AKIAT2MVAPEYCZ24V3IM',
        secretAccessKey: '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',
        region: 'us-east-2'
    });

    var params = {
        Bucket: 'face-detect-bucket',
        Key: '', // pass key
        Body: null, // pass file body
    };

    //params.Key = req.file.originalname;
    params.Key = fileName;
    params.Body = stream;

    s3Client.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error -> " + err });
            res.json({ message: 'error' });
        } else {
            this.detectFace(params.Key, res);
        }

    });
}