const express = require('express');
const controller = require('../controllers/offerController');
const {isGuest} = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

// POST /cards/:id/offers
router.post('/', isGuest, controller.create);

// GET /cards/:id/offers
router.get('/offers', controller.view);

// POST /cards/:id/accept
router.post('/:offerid/accept', isGuest, controller.accept);

module.exports = router;
