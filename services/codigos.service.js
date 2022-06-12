const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

const { models } = require('./../libs/sequelize')

class codigosService {

  constructor(){
    this.codigos = []
    this.pool = pool
    this.pool.on('error', (error) => console.error(error))
    
  }

  
  comprobarLista(comprobante, lista){//mira si en la lista esta el comprobante y 
    //si si nos devolvera un numero que se pueda
    const include = lista.includes(comprobante)
    if(include){
      for(let i = 1; i <= lista.length ; i ++){
        if(!lista.includes(i)){
          return i
        }
      }
      return Math.max(...lista) + 1
    }
    return comprobante
  }

  async create(data) {
    const lista = await this.find()
    
    const listaId =  await this.comprobarLista(data.id, lista.map(item => item.id))
    data.id = listaId
    
    const listaCodigo = await this.comprobarLista(data.codigo, lista.map(item => item.codigo))
    data.codigo = listaCodigo
    
    const newCodigo = await models.Codigos.create(data)
    return  newCodigo
  }

  async find() {

    const rta = await models.Codigos.findAll()
    return rta;
  }

  async findOne(id) {
    const codigo = await models.Codigos.findByPk(id)
    if (!codigo) {
      throw boom.notFound('codigos not found');
    }
    
    return codigo;
  }

  async update(id, changes) {

    const codigo = await this.findOne(id)
    const rta = await codigo.update(changes)
    return rta
  }

  async delete(id) {
    const codigo = await this.findOne(id)
    await codigo.destroy()
    return {"codigo deletet id": id}
  }

}

module.exports = codigosService;
