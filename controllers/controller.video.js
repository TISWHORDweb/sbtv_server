const dotenv = require("dotenv")
dotenv.config()
const Joi = require('joi');
const { useAsync, utils, errorHandle, } = require('../core');
const { ModelVideo } = require("../models");


//KIN
exports.createVideo = useAsync(async (req, res) => {

    try {
        const { video, title, description } = req.body

        if (!video || !title) return res.status(402).json(utils.JParser('Felds is required', false, []));

        //validate user
        const data = await ModelVideo.create(req.body)

        if (data) {
            return res.json(utils.JParser('Video created successfully', !!data, data));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.getSingleVideo = useAsync(async (req, res) => {

    try {

        const vid = req.params.id
        const option = {
            where: { vid }
        }

        const video = await ModelVideo.findOne(option)

        if (video) {
            return res.json(utils.JParser('Video fetch successfully', !!video, video));
        } else {
            return res.status(402).json(utils.JParser('Video not found', false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})



exports.editVideo = useAsync(async (req, res) => {

    try {

        const schema = Joi.object({
            id: Joi.number().required(),
            url: Joi.string().min(3).optional(),
            title: Joi.string().optional(),
            description: Joi.string().optional()
        })

        const { name, title, description, id } = req.body;

        //validate user
        const value = await schema.validateAsync(req.body);

        const vid = value.id
        const option = {
            where: { vid }
        }

        if (!id) return res.status(402).json(utils.JParser('Video not found', false, []));

        await ModelVideo.update(value, option).then(async () => {
            const video = await ModelVideo.findOne(option);
            return res.json(utils.JParser('Video Update Successfully', !!video, video));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allVideo = useAsync(async (req, res) => {

    try {
        const video = await ModelVideo.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        if (!video) return res.status(402).json(utils.JParser('Video not found', false, []));
        return res.json(utils.JParser('All video fetch successfully', !!video, video));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteVideo = useAsync(async (req, res) => {
    try {
        const vid = req.params.id
        if (!vid) return res.status(402).json(utils.JParser('provide the patient id', false, []));
        const option = {
            where: { vid }
        }
        const video = await ModelVideo.destroy(option)
        return res.json(utils.JParser('Patient deleted successfully', !!video, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});
