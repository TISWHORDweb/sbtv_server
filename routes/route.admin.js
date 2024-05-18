 
let express = require('express');
const { adminBodyGuard } = require('../middleware/middleware.protects');
const { getUser } = require('../controllers/controller.user');
const { createVideo, getSingleVideo, allVideo, editVideo, deleteVideo } = require('../controllers/controller.video');
let router = express.Router();


//USER ROUTES
router.get('/:id', adminBodyGuard, getUser);

//VIDEO ROUTES
router.post('/video/create', adminBodyGuard, createVideo);
router.put('/video/edit', adminBodyGuard, editVideo);
router.delete('/video/delete/:id', adminBodyGuard, deleteVideo);
router.get('/video/all', adminBodyGuard, allVideo);
router.get('/video/:id', adminBodyGuard, getSingleVideo);


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;