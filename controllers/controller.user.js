const dotenv = require("dotenv")
dotenv.config()
const { useAsync, utils, errorHandle, } = require('../core');
const { ModelUser } = require("../models");


//KIN
exports.getUser = useAsync(async (req, res) => {

    try {

        const uid = req.userId
        const option = {
            where: {uid}
        }
        const user = await ModelUser.findOne(option)

        if (user) {
            return res.json(utils.JParser('User fetch successfully', !!user, user));
        } else {
            return res.status(402).json(utils.JParser('User not found', false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})
