const express = require("express");
const router = express.Router();



const payment = require("../controller/paymentController");

router.post('/payment/process', payment.donation);
router.post('/sponsor/payment', payment.sponsor)
//search


module.exports = router;