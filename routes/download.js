const express = require('express');
const router = express.Router();

const authenticatemiddleware = require('../authenticate/middleware');
const downloadcontroller = require('../controllers/download');

router.get('/downloadexpence', authenticatemiddleware.authenticate, downloadcontroller.downloadexpence);

module.exports = router;
