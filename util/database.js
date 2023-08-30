const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete','root','Nithin5992',{
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
