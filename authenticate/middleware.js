const jwt = require("jsonwebtoken");

const User = require('../models/user');

exports.authenticate = async (req, res, next) => {
  const data = jwt.verify(req.header('authorization'), 'secretkey')
  req.userid = data.userid
  const user = await User.findOne({ where: { id: data.userid } })
  req.user = user

  next();

}