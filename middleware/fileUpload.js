const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/cards');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const mimeTypes = ['image/jpeg', 'image/png'];
    if (mimeTypes.includes(file.mimetype))
        return cb(null, true);
    else
        cb(new Error('Invalid file type. Only jpg, jpeg and png image files are allowed.'), false);
}

exports.upload = multer({storage, fileFilter}).single('image'); //allows image upload
