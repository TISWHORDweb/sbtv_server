const dotenv = require("dotenv")
dotenv.config()
const Joi = require('joi');
const { useAsync, utils, errorHandle, } = require('../core');
const { ModelTalent } = require("../models");


//KIN
exports.createTalent = useAsync(async (req, res) => {

    try {

        //create data if all data available
        const schema = Joi.object({
            url: Joi.string().required(),
            title: Joi.string().min(3).max(150).required(),
        })

        const { url, title, description } = req.body;

        //validate user
        const value = await schema.validateAsync(req.body);
        const talent = await new ModelTalent(value)

        await talent.save().then(async () => {
            return res.json(utils.JParser('Talent created successfully', !!talent, talent));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.getSingleTalent = useAsync(async (req, res) => {

    try {

        const vid = req.params.id
        const option = {
            where: { vid }
        }

        const talent = await ModelTalent.findOne(option)

        if (talent) {
            return res.json(utils.JParser('Talent fetch successfully', !!talent, talent));
        } else {
            return res.status(402).json(utils.JParser('Talent not found', false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})



exports.editTalent = useAsync(async (req, res) => {

    try {

        const schema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().min(3).max(150).optional(),
            title: Joi.string().min(3).max(150).optional(),
            description: Joi.string().optional()
        })

        const { name, title, description, id } = req.body;

        //validate user
        const value = await schema.validateAsync(req.body);

        const vid = value.id
        const option = {
            where: { vid }
        }

        if (!id) return res.status(402).json(utils.JParser('Talent not found', false, []));

        await ModelTalent.update(value, option).then(async () => {
            const talent = await ModelTalent.findOne(option);
            return res.json(utils.JParser('Talent Update Successfully', !!talent, talent));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allTalent = useAsync(async (req, res) => {

    try {
        const talent = await ModelTalent.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        if (!talent) return res.status(402).json(utils.JParser('Talent not found', false, []));
        return res.json(utils.JParser('All talent fetch successfully', !!talent, talent));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteTalent = useAsync(async (req, res) => {
    try {
        const vid = req.params.id
        if (!vid) return res.status(402).json(utils.JParser('provide the patient id', false, []));
        const option = {
            where: { vid }
        }
        const talent = await ModelTalent.destroy(option)
        return res.json(utils.JParser('Patient deleted successfully', !!talent, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});
