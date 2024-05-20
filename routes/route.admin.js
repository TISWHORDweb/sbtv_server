 
let express = require('express');
const { adminBodyGuard } = require('../middleware/middleware.protects');
const { getUser, editUser, deleteUser, allUser, getSingleUser } = require('../controllers/controller.user');
const { createVideo, getSingleVideo, allVideo, editVideo, deleteVideo } = require('../controllers/controller.video');
const { editTalent, deleteTalent, allTalent, getSingleTalent } = require('../controllers/controller.talent');
const { Insight } = require('../controllers/controller.admin');
let router = express.Router();


//INSIGHT
router.get('/insight', adminBodyGuard, Insight);

//VIDEO ROUTES
router.post('/video/create', adminBodyGuard, createVideo);
router.put('/video/edit', adminBodyGuard, editVideo);
router.delete('/video/delete/:id', adminBodyGuard, deleteVideo);
router.get('/video/all', adminBodyGuard, allVideo);
router.get('/video/:id', adminBodyGuard, getSingleVideo);

//TALENT ROUTES
router.put('/talent/edit', adminBodyGuard, editTalent);
router.delete('/talent/delete/:id', adminBodyGuard, deleteTalent);
router.get('/talent/all', adminBodyGuard, allTalent);
router.get('/talent/:id', adminBodyGuard, getSingleTalent);

//USER ROUTES
// router.put('/user/edit', adminBodyGuard, editUser);
router.delete('/user/delete/:id', adminBodyGuard, deleteUser);
router.get('/user/all', adminBodyGuard, allUser);
router.get('/user/:id', adminBodyGuard, getSingleUser);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;