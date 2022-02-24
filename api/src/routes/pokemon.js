const { Pokemon, Tipo } = require('../db');
const express = require('express');
const { Router } = require('express');
const router = Router();
const axios = require('axios');


const { 
    createNewPokemon,
    addTypes,
    getPokemons, 
} = require('./models/model');

router.use(express.json());


// RUTAS

router.get('/:id', (req, res, next) => {


    res.send('holi')
});

router.get('/', (req, res, next) => {

    getPokemons()
    .then(pokemons => res.send(pokemons));
});

router.post('/', (req, res, next) => {
    const { idTypes } = req.query;
    Pokemon.create(createNewPokemon(req.body))
    // .then(pokemon => {
    //     console.log(pokemon.dataValues.ID);
    //     if(idTypes){
    //         addTypes(idTypes, pokemon.dataValues.ID)
    //         .then(r => console.log(r))
    //     }
    // })
    .then(pokemon => res.json({msg: 'Pokemon creado con éxito', pokemon}))
    .catch(e => next(e));

});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports = router;