const { Codigos , CodigosShema } = require('./codigos.model')

function setupModels(sequelize){
    Codigos.init(CodigosShema, Codigos.config(sequelize))

}

module.exports = setupModels