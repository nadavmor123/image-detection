let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const awsWorker = require('../controllers/aws.controller.js');

router.post('/api/file/upload', upload.single("file"), awsWorker.doUpload);

router.post('/api/file/upload2', function(req, res) {
    var buf = Buffer.from(req.body.file, 'base64');
    awsWorker.doUpload(buf, req.body.filename, res);
});

module.exports = router;