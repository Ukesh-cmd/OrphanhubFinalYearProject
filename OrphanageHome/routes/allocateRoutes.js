const express = require("express");
const router = express.Router();

const { addFields, allocateDonation, updateOrInsertCategories, showAllocatedAmount, updateCat } = require("../controller/allocationControler")

router.post('/addcolumn', addFields);
router.get('/allocateDonation', allocateDonation);
router.get('/allocatedAmount', showAllocatedAmount)
router.post('/updateOrInsertCategories', updateOrInsertCategories);
router.post('/updateCat',updateCat);

module.exports = router;