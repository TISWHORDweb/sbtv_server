 
let express = require('express');
const { bodyGuard } = require('../middleware/middleware.protects');
const { getUser } = require('../controllers/controller.user');
const { getSingleVideo, allVideo } = require('../controllers/controller.video');
const { createTalent } = require('../controllers/controller.talent');
let router = express.Router();


//USER ROUTES
router.get('/details', bodyGuard, getUser);

//VIDEO ROUTES
router.get('/video/all', allVideo);
router.get('/video/:id', bodyGuard, getSingleVideo);

//TALENT ROUTES
router.post('/talent/create', bodyGuard, createTalent);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;