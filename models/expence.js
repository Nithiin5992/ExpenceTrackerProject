const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expence = sequelize.define('dailyexpence', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expenceamount: Sequelize.INTEGER,
    description: Sequelize.STRING,
    category: Sequelize.STRING

});

module.exports = Expence;