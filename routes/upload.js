const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadContoller');
const multer = require('multer');
const upload = multer();

router.post('/', upload.single('file'), uploadFile);

module.exports = router;
