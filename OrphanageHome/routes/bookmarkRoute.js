const express = require("express");
const router = express.Router();

const bookmarkController = require('../controller/bookmarkController')

router.get('/bookmark/get', bookmarkController.getBookmarkedChildCards);
router.post('/bookmark/add', bookmarkController.bookmarkChildCard);
router.delete('/bookmark/remove', bookmarkController.unbookmarkChildCard);

module.exports = router;