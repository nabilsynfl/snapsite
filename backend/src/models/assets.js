const { Sequelize } = require('sequelize');
const db = require('../config/database');
const {DataTypes} = Sequelize;
const articles = require('./articles');

const assets = db.define('assets', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, 
}, {
    freezeTableName: true,
});