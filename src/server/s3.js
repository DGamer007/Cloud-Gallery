const S3 = require('aws-sdk/clients/s3');
const { v4: uuid } = require('uuid');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const KEY_PREFIX = process.env.REACT_APP_AWS_IMAGE_KEY_PREFIX;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const parseKey = key => key.replace(KEY_PREFIX, '');

// Upload Images to s3

const uploadImagesToS3 = async (images) => {
    try {
        for (let i in images) {
            images[i] = parseKey((await s3.upload({
                Bucket: bucketName,
                Body: images[i].buffer,
                Key: `${KEY_PREFIX}${uuid()}`,
            }).promise()).Key);
        }

        return images;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Get Images from s3

const fetchManyImages = async () => {
    try {
        const { Contents: objects } = await s3.listObjects({
            Bucket: bucketName,
            Prefix: KEY_PREFIX
        }).promise();

        const images = objects.map(({ Key }) => parseKey(Key));

        return images;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Get Image from s3

const fetchImageByKey = (Key) => {
    try {
        return s3.getObject({
            Bucket: bucketName,
            Key: `${KEY_PREFIX}${Key}`
        }).createReadStream();
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Delete Image from s3

const deleteImage = async (key) => {
    return s3.deleteObject({
        Bucket: bucketName,
        Key: `${KEY_PREFIX}${key}`
    }).promise();
};


module.exports = {
    uploadImagesToS3,
    fetchImageByKey,
    fetchManyImages,
    deleteImage
};