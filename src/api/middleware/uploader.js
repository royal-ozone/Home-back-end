const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_BUCKET_REGION
});



const filerFilter = (req, file, cb) =>{
    if(file.mimetype === 'image.jpeg' || file.mimetype === 'image.png'){
        cb(null,true);
    } else {
        cb(new Error('file type is not supported, only JPEG and PNG'), false)
    }
}

const uploadS3 = multer({
    filerFilter,
    limits:{
        files: 5,
        fileSize: 500000,
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req,file, cb) =>{
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) =>{
            cb(null,Date.now().toString() + '-' + file.originalname)
        },
    })
});

const deleteRemoteFile = async fileUrl =>{
    try {
        const key = fileUrl.split('/')[3];
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        }).promise();
        return 'deleted successfully'
    } catch (error) {
        throw new Error(error.message)
    }
}




module.exports = {
    uploadS3,
    deleteRemoteFile,
}