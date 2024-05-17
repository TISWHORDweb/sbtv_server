const { ModelUser } = require("../models");
const ModelAdmin = require("../models/model.admin");

 
class CoreError extends Error {
    constructor(msg, code) {
        super(msg);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.CoreError = CoreError;
//json parser function
exports.JParser = (m, s, d) => ({message: m, status: s, data: d});
//ascii code generator


exports.checkMail = async (email) => {
    const check = { where: { email: email } }
    const admin = await ModelAdmin.findOne(check)
    const user = await ModelUser.findOne(check)

    let data

    if (user) {
        data = user
    } else if (admin) {
        data = admin
    }

    return data;
}
