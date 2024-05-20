 
exports.ModelUser = require('./model.user');
exports.ModelVideo = require('./model.video');
exports.ModelAdmin= require('./model.admin');
exports.ModelTalent= require('./model.talent');


require('./model.talent').belongsTo(require("./model.user"), {
    as: 'user',
    foreignKey: {name: 'uid', allowNull: null}
});
