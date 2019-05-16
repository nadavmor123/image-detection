var stream = require('stream');
const AWS = require('aws-sdk');
const vision = require('@google-cloud/vision');
const s3 = require('../config/s3.config.js');
const fs = require('fs');
const client = new vision.ImageAnnotatorClient();

exports.detectFace = (stream, res) => {

    findFacesInStream(stream).then(res => {
        res.json({ message: res });
    }, err => {
        res.json({ message: err });
    })
}

exports.doUpload = (stream, fileName, res) => {

    var s3Client = new AWS.S3({
        accessKeyId: 'AKIAT2MVAPEYCZ24V3IM',
        secretAccessKey: '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',
        region: 'us-east-2'
    });

    s3Client.upload(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error -> " + err });
            res.json({ message: 'error' });
        } else {
            this.detectFace(stream, res);
        }
    });
};

async function findFacesInStream(inputFile) {
    // Make a call to the Vision API to detect the faces
    const request = { image: { source: { filename: inputFile } } };
    const results = await client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    const numFaces = faces.length;
    console.log(`Found ${numFaces} face${numFaces === 1 ? '' : 's'}.`);
    return faces;
}