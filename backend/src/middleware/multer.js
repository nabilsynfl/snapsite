const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype.startsWith('image')) {
            cb(null, 'public/images');
        } else {
            cb(new Error('File dengan jenis ini tidak diizinkan!'), null);
        }
        
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;
        cb(null, `${timestamp}-${originalname}`);
    }
});

const upload = multer({storage: storage});

module.exports = upload;