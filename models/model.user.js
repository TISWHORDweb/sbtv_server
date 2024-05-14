 
/**
 * Model for user 
 */
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');
const tableName = " reach_users";
const queryInterface = sequelize.getQueryInterface();
/**
 * Model extending sequelize model class
 */
class ModelUser extends Model {
}

ModelUser.init({
    uid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    fullname: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: true},
    blocked: {type: DataTypes.BOOLEAN, defaultValue: false},
    lastLogin: {type: DataTypes.STRING},
    token: {type: DataTypes.STRING, allowNull: true, unique: true},
}, {sequelize, tableName});
/**
 * Run belonging and relationship before sync()
 */

// queryInterface.addColumn(tableName, 'lastLogin', {
//     type: DataTypes.STRING
// });

// queryInterface.removeColumn('reach_users', 'trxTrials');


sequelize.sync();
module.exports = ModelUser;