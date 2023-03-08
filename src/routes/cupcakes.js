const express = require('express');
const router = express.Router();
const { getAll, getById, postOne } = require('../services/cupcakes');

router.get('/', getAll);

router.get('/:id', getById);

router.post('/', postOne);

module.exports = router;
