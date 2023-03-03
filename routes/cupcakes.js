const express = require('express');
const router = express.Router();
const { getAll, getById } = require('../controllers/cupcakes');

router.get('/', getAll);

router.get('/:id', getById);

router.post('/');

module.exports = router;
