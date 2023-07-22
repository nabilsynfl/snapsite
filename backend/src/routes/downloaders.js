const express = require('express');
const router = express.Router();
const postDownloader = require('../services/downloaders.js');
const {verifyUsers,  verifyAdmin} = require('../middleware/authUsers.js');

//Download Video Youtube
router.post('/', verifyUsers, verifyAdmin, postDownloader)

module.exports = router;