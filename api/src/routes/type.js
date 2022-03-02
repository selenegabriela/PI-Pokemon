const { Pokemon, Tipo } = require('../db');
const express = require('express');
const { Router } = require('express');
const router = Router();

const { 
    getTypes,
} = require('./models/model');

router.get('/', (req, res, next) => {
    getTypes()
    .then(types => res.json(types))
    .catch(e => next(e));
})

module.exports = router;
