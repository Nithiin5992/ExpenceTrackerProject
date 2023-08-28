const Sequelize = require('sequelize');

const sequelize = new Sequelize('Expencetracker','Nithinkumar','Nithin5992',{
  dialect: 'mysql',
  host: 'database-1.ci588dctszbs.us-east-1.rds.amazonaws.com'
});

module.exports = sequelize;
