const express = require('express');
const {logIn, logOut, me} = require('../controller/auth');

const router = express.Router();


router.get('/me', me);

router.post('/login', logIn);

router.delete('/logout', logOut);


module.exports = router;