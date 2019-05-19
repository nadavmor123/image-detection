let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const awsWorker = require('../controllers/aws.controller.js');

router.post('/api/file/upload', function(req, res) {
    awsWorker.doUpload(req,res);
});

module.exports = router;