const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('./../libs/postgres.pool');

class ReferidosService {

  constructor(){
    this.referidos = [];
    this.pool = pool
    this.pool.on('error', (error) => console.error(error))
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.referidos.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newReferido = {
      id: String(Math.trunc(100 * Math.random())),
      codigoReferencia: faker.datatype.number(),
      ...data
    }
    this.referidos.push(newReferido);
    return newReferido;
  }

  find() {
    return this.referidos;
  }

  async findOne(id) {
    const product = this.referidos.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.referidos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.referidos[index];
    this.referidos[index] = {
      ...product,
      ...changes
    };
    return this.referidos[index];
  }

  async delete(id) {
    const index = this.referidos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.referidos.splice(index, 1);
    return { id };
  }

}

module.exports = ReferidosService;
