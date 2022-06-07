const Joi = require('joi');

const id = Joi.string()
const codigo = Joi.string()
const name = Joi.string().min(3);
const lastName = Joi.string().min(3)
const telephone = Joi.string().min(9).max(13);


const createCodigoSchema = Joi.object({
  //codigo: codigo.required(),
  id: id.required(),
  name: name.required(),
  lastName: lastName.required(),
  telephone: telephone.required(),
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
