
const sha1 = require('sha1');
const Joi = require('joi');
/**
 * importing custom model
 */
const { useAsync, utils, errorHandle, } = require('./../core');
const { emailTemple, etpl } = require('./../services');
/**
 * importing models
 */
const { ModelUser, ModelVideo, ModelTalent, ModelAdmin } = require('./../models');
/**
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.index = useAsync(async (req, res) => {
    res.json(utils.JParser("Welcome to admin api", true, {}));
})
/**
 * @route-controller /api/v1/admin/start
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.adminStats = useAsync(async (req, res, next) => {
    try {
        //create data if all data available
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
        })
        //capture user data
        const { email } = req.body;
        //validate user
        const validator = await schema.validateAsync({ email });
        //hash password before checking
        const newPass = utils.AsciiCodes(8);
        const user = await ModelUser.findOne({ where: validator });
        if (user) {
            const uuser = user.update({ password: sha1(newPass), token: sha1(user.email + new Date().toUTCString) });
            if (uuser) {
                /**
                 * Change email template before productions
                 */
                new emailTemple(user.email)
                    .who(user.fullname)
                    .body("You requested for a password reset<br/>" +
                        "A new password has been generated for you, do login and change it immediately" +
                        "<h1 style='margin-top: 10px; margin-bottom: 10px;'>" + newPass + "</h1>" +
                        "Check out our new courses.")
                    .subject(etpl.PasswordReset).send().then(r => console.log(r));
            }
        }
        res.json(utils.JParser("ok-response", !!user, user));
    } catch (e) {
        throw new errorHandle(e.message, 202);
    }
});

exports.Insight = useAsync(async (req, res) => {
    const aid = req.adminId
    try {
        const option = { where: { aid } }
        const admin = await ModelAdmin.findOne(option)
        if (admin) {
            const name = admin.name
            const user = await ModelUser.findAndCountAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            const video = await ModelVideo.findAndCountAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            const talent = await ModelTalent.findAndCountAll({
                order: [
                    ['createdAt', 'DESC'],
                ]
            });
            const AllUser = user.count
            const AllVideo = video.count
            const AllTalent = talent.count
            const LastUser = user.rows[user.rows.length - 1]
            const LastTalent = talent.rows[talent.rows.length - 1]
            const LastVideo = video.rows[video.rows.length - 1]

            const users = {
                AllUser,
                date: LastUser.createdAt
            }
            const videos = {
                AllVideo,
                date: LastVideo.createdAt
            }
            const talents = {
                AllTalent,
                date: LastTalent.createdAt
            }
            const data = { name, users, videos, talents }
            return res.json(utils.JParser('Insight fetch successfully', !!data, data));
        }
    } catch (e) {
        throw new errorHandle(e.message, 400)
    }
})