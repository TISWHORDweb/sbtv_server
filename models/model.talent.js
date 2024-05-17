 
/**
 * Model for user 
 */
const sequelize = require('./../database');
const {DataTypes, Model} = require('sequelize');
const tableName = " view_talents";
const queryInterface = sequelize.getQueryInterface();
/**
 * Model extending sequelize model class
 */
class ModelTalent extends Model {
}

ModelTalent.init({
    tid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    uid: {type: DataTypes.INTEGER},
    name: {type: DataTypes.STRING},
    facebook: {type: DataTypes.STRING },
    tiktok: {type: DataTypes.STRING },
    youtube: {type: DataTypes.STRING },
    twitter: {type: DataTypes.STRING },
    snapchat: {type: DataTypes.STRING },
}, {sequelize, tableName});
/**
 * Run belonging and relationship before sync()
 */

// queryInterface.addColumn(tableName, 'lastLogin', {
//     type: DataTypes.STRING
// });

// queryInterface.removeColumn('reach_users', 'trxTrials');


sequelize.sync();
module.exports = ModelTalent;