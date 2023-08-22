const express = require('express');
const router = express.Router();

const authenticatemiddleware = require('../authenticate/middleware');
const expencecontroller = require('../controllers/expence');

router.post('/dailyexpence', authenticatemiddleware.authenticate, expencecontroller.postdailyexpence);
router.get('/dailyexpence', authenticatemiddleware.authenticate, expencecontroller.getdailyexpence);
router.delete('/dailyexpence/:id', expencecontroller.deletedailyexpence);

module.exports = router;