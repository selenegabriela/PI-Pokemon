const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemon');
const typeRouter = require('./type');


const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonRouter);
router.use('/types', typeRouter);


module.exports = router;
