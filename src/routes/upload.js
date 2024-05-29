const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });


router.post('/upload', upload.single('image'), (req, res) => {
    console.log("hihi");
    console.log(req.file);
    res.send('File uploaded');
});

module.exports = router;