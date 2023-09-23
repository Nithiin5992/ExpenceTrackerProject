const express = require('express');

const router = express.Router();

const authenticatemiddleware = require('../authenticate/middleware');

const purchasecontroller = require('../controllers/purchase');

router.get('/purchase/purchasepremium', authenticatemiddleware.authenticate, purchasecontroller.purchasepremium);

router.post('/purchase/updatetransactionstatus', authenticatemiddleware.authenticate, purchasecontroller.updateTransactionStatus);

module.exports = router;