
let { ModelUser } = require('../models');
const { errorHandle, utils, useAsync } = require('../core');
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken');

//body safe state
exports.bodyParser = (req, res, next) => {
    if (!Object.keys(req.body).length > 0) throw new errorHandle("the document body is empty", 202);
    else next();
}

//user body guard
exports.bodyGuard = useAsync(async (req, res, next) => {
    const rToken = req.headers['r-token'];
    if (!rToken) return res.status(400).json(utils.JParser("Unauthorized Access, Use a valid token and try again", false, []));
    const isValid = await ModelUser.findOne({where : { token: rToken }});
    if (isValid) {

        //****** Decrypt Last Login Date and Time *******//
        const bytes = CryptoJS.AES.decrypt(isValid.lastLogin, process.env.SECRETKEY);
        let lastLogin = bytes.toString(CryptoJS.enc.Utf8);

        //****** Convert to date from string *******//
        lastLogin = JSON.parse(lastLogin)
        lastLogin = new Date(lastLogin)

        //****** Calculate an hour ago in milliseconds *******//
        const oneHour = 1200 * 60 * 1000; /* ms */

        //********** Throw error if token has expired (1hr) **************//
        if (((new Date) - lastLogin) > oneHour) { res.status(401).json(utils.JParser("Invalid or expired token, Use a valid token and try again", false, [])); }

        req.userId = isValid.uid
        req.userEmail = isValid.email
        next()
    } else {
        return res.status(400).json(utils.JParser("Invalid token code or token, Use a valid token and try again", false, []));
    }
})