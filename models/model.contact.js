 
/**
 * Model for user 
 */
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');
const tableName = " reach_contacts";
const queryInterface = sequelize.getQueryInterface();
/**
 * Model extending sequelize model class
 */
class ModelContact extends Model {
}

ModelContact.init({
    cid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    phone: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
}, {sequelize, tableName});
/**
 * Run belonging and relationship before sync()
 */

sequelize.sync();
module.exports = ModelContact;

// queryInterface.removeColumn('reach_contacts', 'phone');
// queryInterface.addColumn(tableName, 'phone', {
//     type: DataTypes.STRING
// });