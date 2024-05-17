 
let express = require('express');
const { bodyGuard } = require('../middleware/middleware.protects');
const { getUser } = require('../controllers/controller.user');
const { createVideo, getSingleVideo, allVideo, editVideo, deleteVideo } = require('../controllers/controller.video');
let router = express.Router();


//USER ROUTES
router.get('/details', bodyGuard, getUser);

//VIDEO ROUTES
router.post('/video/create', bodyGuard, createVideo);
router.put('/video/edit', bodyGuard, editVideo);
router.delete('/video/delete/:id', bodyGuard, deleteVideo);
router.get('/video/all', bodyGuard, allVideo);
router.get('/video/:id', bodyGuard, getSingleVideo);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;