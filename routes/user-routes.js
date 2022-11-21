const express = require('express');
const {isLoggedIn} = require('../lib/auth.js');
const router = express.Router();
const {    
    signin,
    credentials,
    updateMainUser
    } = require("../controllers/user-controllers")


router.get ("/",signin);

router.get ("/credentials",isLoggedIn ,credentials)

router.post('/edit/:id', updateMainUser );

module.exports = router;
