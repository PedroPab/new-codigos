const faker = require('faker');
const boom = require('@hapi/boom');

class codigosService {

  constructor(){
    this.codigos = [];
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

  find() {
    return this.codigos;
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
