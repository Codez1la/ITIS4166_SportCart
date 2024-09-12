const express = require('express');
const controller = require('../controllers/cardController');
const { upload } = require('../middleware/fileUpload')
const {isLoggedIn, isAuthor} = require('../middleware/auth');
const {validateId} = require('../middleware/validator');

const offerRoute = require('./offerRoutes');

const router = express.Router();

//GET /items: send all the cards to the user

router.get('/', controller.index);

//GET /items/new: send html form for creating a new story

router.get('/new', isLoggedIn, controller.new);

//POST /items: created a new story

router.post('/', upload, isLoggedIn, controller.create);

//GET /items/:id: send details of card identified by id

router.get('/:id', validateId, controller.show);

//GET /items/:id/edit: send html form for editing an existing card

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /items/:id: update the card identified by id
router.put('/:id', upload, validateId, isLoggedIn, isAuthor, controller.update);

//DELETE /items/:id: delete the story identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

router.use('/:id', offerRoute);

module.exports = router;