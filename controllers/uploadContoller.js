const AWS = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

exports.uploadFile = async (req, res) => {
    const file = req.file;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuid()}${fileExtension}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        const data = await s3.upload(params).promise();
        res.json({ fileUrl: data.Location });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
