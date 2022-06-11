const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

const { models } = require('./../libs/sequelize')

class codigosService {

  constructor(){
    this.codigos = []
    this.pool = pool
    this.pool.on('error', (error) => console.error(error))
    
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.codigos.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.codigosName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newCodigo = await models.Codigos.create(data)
    return newCodigo
  }

  async find() {

    const rta = await models.Codigos.findAll()
    // const query = 'SELECT * FROM task'
    // const [data] = await sequelize.query(query)
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
