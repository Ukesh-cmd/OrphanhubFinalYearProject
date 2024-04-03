const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { childDetails } = require('../helpers/childValidation');
const childController = require("../controller/childController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 6 * 1024 * 1024 }
});

router.post('/child/add', upload.single('image'), childDetails, childController.registerChild);

router.get('/child/get', childController.showChild);
router.get('/child/get/:id', childController.getChildById);
router.put('/child/put/:id', upload.single('image'), childController.updateChildDetail);
router.delete('/child/delete/:id', childController.deleteChild);
router.get('/child/count', childController.countChild);
//search
router.get('/child/search', childController.searchChildren);
router.get('/child/recommended', childController.getRecommendedChildren)
module.exports = router;