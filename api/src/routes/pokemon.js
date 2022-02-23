const { Pokemon } = require('../db');
const { Router, request } = require('express');
const router = Router();
const axios = require('axios');


const { 
    createNewPokemon 
      } = require('./models/model');

router.get('/', (req, res, next) => {
    const pokemons = axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    .then(request => {
        
        return request.data.results.map((pokemon) => axios.get(pokemon.url))

    })
    .then(promises => Promise.all(promises)
        .then(promises => promises.map((promise) => {
            return {
                nombre: promise.data.forms[0].name
            }
        })))
        .then(r => console.log(r))
    res.send('holi');
});

// router.get('/', (req, res, next) => {

//     let requests = [];
//     // axios.get(`https://pokeapi.co/api/v2/pokemon/${1}/`)
//     // .then(r => console.log(r.data));
//     for(let i = 0; i < 40; i++){
//         requests.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        
//     }

//     let promises = requests.map(url => axios.get(url));

//     Promise.all(promises)
//     .then(r => console.log(r[0]));

//     // console.log(promises);
//     // console.log(requests);
    
//     // var hola = axios.get('https://pokeapi.co/api/v2/pokemon/1/')
//     // var hola2 = axios.get('https://pokeapi.co/api/v2/pokemon/2/');

    
//     // console.log(hola);
//     res.send('holi')
    

//     // https://pokeapi.co/api/v2/pokemon?limit=40
//     // "https://pokeapi.co/api/v2/pokemon/1/"
//     // axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
// });

router.post('/', (req, res, next) => {

    Pokemon.create(createNewPokemon(req.body))
    .then(pokemon => res.json({msg: 'Pokemon creado con éxito', pokemon}));
});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

module.exports = router;