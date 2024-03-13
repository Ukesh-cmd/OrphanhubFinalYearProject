const express = require("express");
const router = express.Router();


const { donorValidation } = require('../helpers/donorValidation')
const donorController = require("../controller/donorController")

router.post('/donor/donate', donorValidation, donorController.donor);
router.get('/donor/get', donorController.showDonor);
router.get('/donor/get/:id', donorController.getDonorById);
//router.put('/donor/put/:id', childController.updateChildDetail);
router.delete('/donor/delete/:id', donorController.deleteDonor);
router.get('/donor/total', donorController.donationAmount);
module.exports = router;