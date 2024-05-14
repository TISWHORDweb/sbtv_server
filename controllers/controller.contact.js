const dotenv = require("dotenv")
dotenv.config()
const Joi = require('joi');
const { useAsync, utils, errorHandle, } = require('../core');
const { ModelContact } = require("../models");


//KIN
exports.createContact = useAsync(async (req, res) => {

    try {

        //create data if all data available
        const schema = Joi.object({
            firstName: Joi.string().min(3).max(150).required(),
            lastName: Joi.string().min(3).max(150).required(),
            phone: Joi.string().required()
        })

        const { firstName, lastName, phone } = req.body;

        //validate user
        const value = await schema.validateAsync(req.body);

        const contact = await new ModelContact(value)

        await contact.save().then(async () => {
            return res.json(utils.JParser('Contact created successfully', !!contact, contact));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.getSingleContact = useAsync(async (req, res) => {

    try {

        const cid = req.params.id
        const option = {
            where: { cid }
        }

        const contact = await ModelContact.findOne(option)

        if (contact) {
            return res.json(utils.JParser('Contact fetch successfully', !!contact, contact));
        } else {
            return res.status(402).json(utils.JParser('Contact not found', false, []));
        }

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})



exports.editContact = useAsync(async (req, res) => {

    try {

        const schema = Joi.object({
            id: Joi.number().required(),
            firstName: Joi.string().min(3).max(150).optional(),
            lastName: Joi.string().min(3).max(150).optional(),
            phone: Joi.string().optional()
        })

        const { firstName, lastName, phone, id } = req.body;

        //validate user
        const value = await schema.validateAsync(req.body);

        const cid = value.id
        const option = {
            where: { cid }
        }

        if (!id) return res.status(402).json(utils.JParser('Contact not found', false, []));

        await ModelContact.update(value, option).then(async () => {
            const contact = await ModelContact.findOne(option);
            return res.json(utils.JParser('Contact Update Successfully', !!contact, contact));
        })

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.allContact = useAsync(async (req, res) => {

    try {
        const contact = await ModelContact.findAll({
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        if (!contact) return res.status(402).json(utils.JParser('Contact not found', false, []));
        return res.json(utils.JParser('All contact fetch successfully', !!contact, contact));
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})

exports.deleteContact = useAsync(async (req, res) => {
    try {
        const cid = req.params.id
        if (!cid) return res.status(402).json(utils.JParser('provide the patient id', false, []));
        const option = {
            where: { cid }
        }
        const contact = await ModelContact.destroy(option)
        return res.json(utils.JParser('Patient deleted successfully', !!contact, []));

    } catch (e) {
        throw new errorHandle(e.message, 400)
    }

});
