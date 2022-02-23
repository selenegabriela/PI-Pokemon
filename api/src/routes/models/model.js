

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
    
}