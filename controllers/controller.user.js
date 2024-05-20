const dotenv = require("dotenv")
dotenv.config()
const Joi = require('joi');
const { useAsync, utils, errorHandle, } = require('../core');
const { ModelUser } = require("../models");



exports.getSingleUser = useAsync(async (req, res) => {

    try {

        const tid = req.params.id
        const option = {
            where: { tid }
        }

        const user = await ModelUser.findOne(option);

        if (user) {
            return res.json(utils.JParser('User fetch successfully', !!user, user));
        } else {
            return res.status(402).json(utils.JParser('User not found', false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allUser = useAsync(async (req, res) => {

    try {
        const user = await ModelUser.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        if (!user) return res.status(402).json(utils.JParser('User not found', false, []));
        return res.json(utils.JParser('All user fetch successfully', !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteUser = useAsync(async (req, res) => {
    try {
        const uid = req.params.id
        if (!uid) return res.status(402).json(utils.JParser('provide the patient id', false, []));
        const option = {
            where: { uid }
        }
        const user = await ModelUser.destroy(option)
        return res.json(utils.JParser('Patient deleted successfully', !!user, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});
