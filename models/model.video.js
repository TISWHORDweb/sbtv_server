 
/**
 * Model for user 
 */
const sequelize = require('../database');
const {DataTypes, Model} = require('sequelize');
const tableName = " view_video";
const queryInterface = sequelize.getQueryInterface();
/**
 * Model extending sequelize model class
 */
class ModelVideo extends Model {
}

ModelVideo.init({
    vid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
    url: {type: DataTypes.STRING, allowNull: false}
}, {sequelize, tableName});
/**
 * Run belonging and relationship before sync()
 */

sequelize.sync();
module.exports = ModelVideo;

// queryInterface.removeColumn('reach_videos', 'phone');
// queryInterface.addColumn(tableName, 'phone', {
//     type: DataTypes.STRING
// });