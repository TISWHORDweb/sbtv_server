 
/**
 * Model for user 
 */
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');
const tableName = " view_admin";
const queryInterface = sequelize.getQueryInterface();
/**
 * Model extending sequelize model class
 */
class ModelAdmin extends Model {
}

ModelAdmin.init({
    aid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    blocked: {type: DataTypes.BOOLEAN, defaultValue: false},
    lastLogin: {type: DataTypes.STRING},
    who: {type: DataTypes.INTEGER, defaultValue: 1},
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
module.exports = ModelAdmin;