const express = require("express");
const router = express.Router();


const { staffDetails } = require('../helpers/staffValidation')
const staffController = require("../controller/sttaffController")

router.post('/staff/add', staffDetails, staffController.registerStaff);
router.get('/staff/get', staffController.showStaff);
router.post('/staff/attendence', staffController.staffAttendence);
module.exports = router;