const express = require('express');

const router = express.Router();

const forgotpasswordcontroller = require('../controllers/forgotpassword');

router.use('/password/forgotpassword', forgotpasswordcontroller.forgotpassword);

router.get('/password/resetpassword/:id', forgotpasswordcontroller.resetpassword);

router.get('password/updatepassword/:id', forgotpasswordcontroller.updatepassword);

module.exports = router;