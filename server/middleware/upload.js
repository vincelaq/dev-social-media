const multer = require('multer');
const uuid = require('uuid/v1');

const mime_type_map = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

const fileUpload = multer({
    limit: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            const ext = mime_type_map[file.mimetype];
            cb(null, uuid() + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!mime_type_map[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;