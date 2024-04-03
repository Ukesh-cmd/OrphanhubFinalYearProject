const express = require("express");

const router = express.Router();

const {  daily, monthly } = require('../controller/topDonorController')


router.get('/daily', daily)
router.get('/monthly', monthly)

module.exports = router;