 
let express = require('express');
const { bodyGuard } = require('../middleware/middleware.protects');
const { getUser } = require('../controllers/controller.user');
const { createContact, getSingleContact, allContact, editContact, deleteContact } = require('../controllers/controller.contact');
let router = express.Router();


//USER ROUTES
router.get('/details', bodyGuard, getUser);

//CONTACT ROUTES
router.post('/contact/create', bodyGuard, createContact);
router.put('/contact/edit', bodyGuard, editContact);
router.delete('/contact/delete/:id', bodyGuard, deleteContact);
router.get('/contact/all', bodyGuard, allContact);
router.get('/contact/:id', bodyGuard, getSingleContact);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;