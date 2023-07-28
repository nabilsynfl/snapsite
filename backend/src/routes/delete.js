const express = require('express');
const router = express.Router();
const deleteThumbnailController = require('../controller/delete');
const { verifyUsers } = require('../middleware/authUsers.js');

router.delete('/:imageName', verifyUsers, deleteThumbnailController.deleteThumbnail);

module.export = router;