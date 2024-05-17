
const sha1 = require('sha1');
const Joi = require('joi');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const CryptoJS = require("crypto-js")
/**
 * importing custom model
 */
const { useAsync, utils, errorHandle, } = require('./../core');
/**
 * importing models
 */
const { ModelUser } = require('./../models');
const ModelAdmin = require('../models/model.admin');
/**
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.index = useAsync(async (req, res) => {
    res.json(utils.JParser("Welcome to auth api", true, {}));
})
/**
 * @route-controller /api/v1/auth/login
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.authLogin = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().min(6).max(12).required()
        })
        //capture user data
        const { email, password } = req.body;
        //validate user
        const validator = await schema.validateAsync({ email, password });
        const user = await checkMail(validator.email)
        if (user) {
            //hash password before checking
            const originalPassword = await bcrypt.compare(req.body.password, user.password);
            if (!originalPassword) {
                return res.json(utils.JParser('Invalid credentials verify your email and password and try again', false, []));
            } else {
                const lastLogin = CryptoJS.AES.encrypt(JSON.stringify(new Date()), process.env.SECRETKEY).toString()
                const token = jwt.sign({ email, uid: user.email }, process.env.SECRETKEY, { expiresIn: '1d' })
                await user.update({ token, lastLogin }).then(() => {
                    
                    user.password = "********************************"
                    return res.json(utils.JParser('logged in successfuly', true, user));
                })
            }
        } 
    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});

/**
 * @route-controller /api/v1/auth/register
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.authRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            name: Joi.string(),
            password: Joi.string().min(6).max(30).required()
        })
        //validate user
        const value = await schema.validateAsync(req.body);
        //rebuild user object
        value.password = await bcrypt.hash(req.body.password, 13)
        //insert into db
        const [user, created] = await ModelUser.findOrCreate({
            where: { email: value.email },
            defaults: value
        });
        //indicate if the user is newx
        let newUser = JSON.parse(JSON.stringify(user));
        newUser['created'] = created;
        res.json(utils.JParser("Congratulation registration is successful", true, newUser));

    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});

/**ADMIN */
exports.adminAuthRegister = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            name: Joi.string(),
            password: Joi.string().min(6).max(30).required()
        })
        //validate user
        const value = await schema.validateAsync(req.body);
        //rebuild user object
        value.password = await bcrypt.hash(req.body.password, 13)
        //insert into db
        const [user, created] = await ModelAdmin.findOrCreate({
            where: { email: value.email },
            defaults: value
        });
        //indicate if the user is newx
        let newUser = JSON.parse(JSON.stringify(user));
        newUser['created'] = created;
        res.json(utils.JParser("Congratulation registration is successful", true, newUser));

    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});