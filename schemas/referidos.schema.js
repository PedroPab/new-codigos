const Joi = require('joi');

const id = Joi.string()
const codigoReferencia = Joi.string()
const name = Joi.string().min(3);
const lastName = Joi.string().min(3)
const telephone = Joi.string().min(9).max(13);


const createReferidosSchema = Joi.object({
  //codigoReferencia: codigoReferencia.required(),
  //id: id.required(),
  name: name.required(),
  lastName: lastName.required(),
  telephone: telephone.required(),
});

const updateReferidosSchema = Joi.object({
  codigoReferencia: codigoReferencia,
  name: name,
  lastName: lastName,
  telephone: telephone,
});

const getReferidosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createReferidosSchema,  updateReferidosSchema, getReferidosSchema }
