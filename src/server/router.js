const { Router } = require('express');
const multer = require('multer');
const { uploadImagesToS3, fetchImageByKey, fetchManyImages, deleteImage } = require('./s3');

const router = Router();
const MAX_COUNT = process.env.REACT_APP_IMAGES_MAX_COUNT;

const multerMiddleware = multer({
    fileFilter(_, file, callback) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            callback(new Error(`${file.originalname} is not an image file. Please upload an image file.`));
        }
        callback(undefined, true);
    }
});

router.get('/get/images', async (req, res) => {
    try {
        const images = await fetchManyImages();
        res.status(200).send({ body: images });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

router.get('/get/image/:key', async (req, res) => {
    try {
        const key = req.params.key;
        const image = fetchImageByKey(key);
        image.pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

router.post('/save/images', multerMiddleware.array('images', MAX_COUNT), async (req, res) => {
    try {
        const images = await uploadImagesToS3(req.files);
        res.status(201).send({ message: 'Images uploaded successfully.', body: images });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }

});

router.delete('/delete/image/:key', async (req, res) => {
    try {
        const key = req.params.key;
        await deleteImage(key);
        res.status(200).send({ body: key });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;