const axios = require('axios');
const { Pokemon, Tipo } = require('../../db');

module.exports = {
    createNewPokemon: (data) => {
        const { nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo} = data;

        let newPokemon;

        return newPokemon = Pokemon.create({
            nombre,
            vida,
            fuerza,
            defensa,
            velocidad,
            altura,
            peso
        })
        .then(() => {
            console.log(newPokemon);
            // return newPokemon.addTipo(tipo)
            // .then(() => newPokemon);
        })
        
    },
    
    getPokemons: (data) => {

        let requestPokemonsDb, firstRequestApi;
        
        if(data){
            const { name } = data;   

            requestPokemonsDb = Pokemon.findOne({
                where: {
                    nombre: name
                }
            })
            const requestPokemonsApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

            return Promise.allSettled([requestPokemonsDb, requestPokemonsApi])
            .then(result => {

                const [ pokemonsDb, pokemonsApi ] = result;
                
                if(pokemonsDb.value === null && pokemonsApi.status === 'rejected'){
                    throw Error('not found')
                } else if(pokemonsDb.value === null){
                    return {
                        nombre: pokemonsApi.value.data.name,
                        image: pokemonsApi.value.data.sprites.front_default,
                        tipos: pokemonsApi.value.data.types.map(t => t.type.name)
                    }
                } else {
                    return {
                        nombre: pokemonsDb.value.nombre,
                        tipos: pokemonsDb.value.tipos,
                    }
                }
                
            })
        } else {
            
            requestPokemonsDb = Pokemon.findAll({
                include: Tipo
            });
            firstRequestApi = axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        
            return Promise.all([requestPokemonsDb, firstRequestApi])
            .then(promises => {
               let [ pokemonsDb, urlPokemonsApi ] = promises;
        
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
        
                    pokemonsDb = pokemonsDb.map(pokemon => {
                        return {
                            nombre: pokemon.dataValues.nombre,
                            tipos: pokemon.dataValues.tipos
                        }
                    })
                    
                    const allPokemons = [... pokemonsApi, ...pokemonsDb];
                    return allPokemons;
                })
            
            });
        }
    },
    getTypes: () => {
        return axios.get('https://pokeapi.co/api/v2/type')
        .then(types => {
            types = types.data.results.map(type => {
                return Tipo.findOrCreate({
                    where: {
                        nombre: type.name,
                    }
                })
            })

        })
        .then(() => {
            return Tipo.findAll()
            .then(types => types)
        })
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