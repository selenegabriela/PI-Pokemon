const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemon');


const router = Router();

// Configurar los routers
router.use('/pokemons', pokemonRouter);


module.exports = router;
