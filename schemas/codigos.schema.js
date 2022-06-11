const Joi = require('joi');

const id = Joi.number().integer()
const codigo = Joi.string()
const name = Joi.string().min(3);
const lastName = Joi.string().min(3)
const telephone = Joi.string().min(1).max(40)


const createCodigoSchema = Joi.object({
  //codigo: codigo.required(),
  id: id,
  name: name.required(),
  lastName: lastName,
  telephone: telephone.required(),
  codigo: codigo,
});

const updateCodigoSchema = Joi.object({
  codigo: codigo,
  name: name,
  lastName: lastName,
  telephone: telephone,
});

const getCodigoSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCodigoSchema, updateCodigoSchema, getCodigoSchema }
