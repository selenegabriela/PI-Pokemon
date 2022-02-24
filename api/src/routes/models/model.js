const axios = require('axios');
const { Pokemon, Tipo } = require('../../db');

module.exports = {
    createNewPokemon: (data) => {
        const { nombre, vida, fuerza, defensa, velocidad, altura, peso} = data;
        return {
            nombre,
            vida,
            fuerza,
            defensa,
            velocidad,
            altura,
            peso
        }
    },
    addType: (idTypes, idPokemon) => {
        return Pokemon.findByPk(idPokemon)
        .then(pokemon => {
            return pokemon.addEpisodes(idTypes);
        })
    },
    getPokemons: (data) => {

        const { name } = data;
        let requestPokemonsDb, firstRequestApi;

        if(name){
            
        } else {
            
            requestPokemonsDb = Pokemon.findAll({
                include: Tipo
            });
            firstRequestApi = axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        
            return Promise.all([requestPokemonsDb, firstRequestApi])
            .then(promises => {
                const [ pokemonsDb, urlPokemonsApi ] = promises;
        
                const requestPokemonsApi = urlPokemonsApi.data.results.map((pokemon) => axios.get(pokemon.url));
        
                return Promise.all(requestPokemonsApi)
                .then(pokemonsApi => {
                    pokemonsApi = pokemonsApi.map(pokemon => {
                        return {
                            nombre: pokemon.data.name,
                            image: pokemon.data.sprites.front_default,
                            tipos: pokemon.data.types.map(t => t.type.name)
                        }
                    });
        
                    
                    const allPokemons = [... pokemonsApi, ...pokemonsDb];
                    return allPokemons;
                })
            
            });
        }
    }
}

//        ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// TIP FRONT -> como acceder a los valores correspondientes desde el front:
// const showSomeValuesPokemonsDb = {
//     nombre: pokemonsDb[0].dataValues.name,
//     tipos: pokemonsDb[0].dataValues.tipos
// }
//     return axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
//     .then(request => {

//         const pokemonsDb = Pokemon.findAll({
//             include: Tipo
//         });
//         const pokemonsApi = request.data.results.map((pokemon) => axios.get(pokemon.url));

//         Promise.all([pokemonDb, pokemonApi])
//         .then(promises => promises)

//     })
//     .then(promises => Promise.all(promises)
//         .then(promises => promises.map((promise) => {
//             return {
//                 nombre: promise.data.name,
//                 image: promise.data.sprites.front_default,
//                 tipos: promise.data.types.map(t => t.type.name)
//             }
//         })))
//         .then(pokemons => pokemons);
// }

// // getPokemons: (data) => {

    
//     // return axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
//     // .then(request => {
        
//     //     return request.data.results.map((pokemon) => axios.get(pokemon.url))

//     // })
//     // .then(promises => Promise.all(promises)
//     //     .then(promises => promises.map((promise) => {
//     //         return {
//     //             nombre: promise.data.name,
//     //             image: promise.data.sprites.front_default,
//     //             tipos: promise.data.types.map(t => t.type.name)
//     //         }
//     //     })))
//     //     .then(pokemons => pokemons);
// // }