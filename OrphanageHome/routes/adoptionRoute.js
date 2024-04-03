const express = require("express");
const multer = require("multer")
const path = require('path');
const router = express.Router();
//const { signUpValidation, logInValidation } = require('../helpers/adminValidation')
const  adptionController = require("../controller/adoptionController")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    
});

router.post('/adoption/adopter',upload.fields([{name: 'marriageCertificate',maxCount:1},
    {name: 'policeClerance', maxCount:1}, 
    {name: 'addoptionform', maxCount:1}, 
    {name:'identificationProof', maxCount:1}]),  adptionController.adopter);

router.post('/adoption/adopte', adptionController.adoptChild);
router.get('/adoption/show/:id', adptionController.getAdopterById);
router.get('/adoption/showadopter', adptionController.pdfShow);
router.get('/adoption/showadoption', adptionController.adoptionRequest);
router.put('/adoption/handlerequest/:id', adptionController.handleRequest);
router.get('/adoption/count', adptionController.countAdoption);
module.exports = router;
