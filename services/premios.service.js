const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

class PremiosServices {

  constructor(){
    this.premios = [];
    this.pool = pool
    this.pool.on('error', (error) => console.error(error))
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.premios.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.premioName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newPremio = {
      id: String(Math.trunc(100 * Math.random())),
      ...data
    }
    this.premios.push(newPremio);
    return newPremio;
  }

  find() {
    return this.premios;
  }

  async findOne(id) {
    const premio = this.premios.find(item => item.id === id);
    if (!premio) {
      throw boom.notFound('premio not found');
    }
    if (premio.isBlock) {
      throw boom.conflict('premio is block');
    }
    return premio;
  }

  async update(id, changes) {
    const index = this.premios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('premio not found');
    }
    const premio = this.premios[index];
    this.premios[index] = {
      ...premio,
      ...changes
    };
    return this.premios[index];
  }

  async delete(id) {
    const index = this.premios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('premio not found');
    }
    this.premios.splice(index, 1);
    return { id };
  }

}

module.exports = PremiosServices;
