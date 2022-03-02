const { Pokemon, Tipo } = require('../db');
const express = require('express');
const { Router } = require('express');
const router = Router();
const axios = require('axios');


const { 
    createNewPokemon,
    getPokemons, 
} = require('./models/model');

router.use(express.json());


// RUTAS


router.get('/:name', (req, res, next)=>{
    getPokemons(req.params)
    .then(pokemon => res.json(pokemon))
    .catch(e => next(e));
});

router.get('/', (req, res, next) => {

    getPokemons()
    .then(pokemons => res.json(pokemons))
    .catch(e => next(e))
});

router.post('/', (req, res, next) => {
    const { idTypes } = req.query;
    createNewPokemon(req.body)
    
    .then(pokemon => res.json({msg: 'Pokemon creado con éxito', pokemon}))
    .catch(e => next(e));

});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports = router;