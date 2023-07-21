const { Sequelize } = require('sequelize');
const db = require('../config/database');
const {DataTypes} = Sequelize;
const Users = require('./users');


const Articles = db.define('articles', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, 
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
});

Users.hasMany(Articles, {foreignKey: 'userId'});
Articles.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Articles