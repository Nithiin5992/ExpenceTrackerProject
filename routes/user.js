const express = require('express');

const router = express.Router();

const usercontroller = require('../controllers/user');

router.get('/user', usercontroller.getuser);

router.post('/user/signup', usercontroller.usersignup);

router.post('/user/login', usercontroller.userlogin);

router.delete('/user/deletedata/:id', usercontroller.deleteuser);

module.exports = router;