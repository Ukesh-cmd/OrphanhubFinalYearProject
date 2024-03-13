const express = require("express");
const router = express.Router();


const  sponsorController=  require('../controller/sponsorController')
router.get('/get/sponsor', sponsorController.showSponsor);
router.get('/get/sponsorChild', sponsorController.showSponsorChild);
module.exports = router;