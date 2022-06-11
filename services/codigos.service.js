const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');
const sequelize = require('./../libs/sequelize')
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
    const newCodigo = {
      id: String(Math.trunc(100 * Math.random())),
      codigoReferencia: faker.datatype.number(),
      ...data
    }
    this.codigos.push(newCodigo);
    return newCodigo;
  }

  async find() {

    const rta = await models.Codigos.findAll()
    // const query = 'SELECT * FROM task'
    // const [data] = await sequelize.query(query)
    return rta;
  }

  async findOne(id) {
    const codigos = this.codigos.find(item => item.id === id);
    if (!codigos) {
      throw boom.notFound('codigos not found');
    }
    if (codigos.isBlock) {
      throw boom.conflict('codigos is block');
    }
    return codigos;
  }

  async update(id, changes) {
    const index = this.codigos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('codigos not found');
    }
    const codigos = this.codigos[index];
    this.codigos[index] = {
      ...codigos,
      ...changes
    };
    return this.codigos[index];
  }

  async delete(id) {
    const index = this.codigos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('codigos not found');
    }
    this.codigos.splice(index, 1);
    return { id };
  }

}

module.exports = codigosService;
