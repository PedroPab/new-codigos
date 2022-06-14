const Joi = require('joi');

const id = Joi.string()
const codigoReferencia = Joi.number().integer()
const notas = Joi.string().max(250)


const createPremiosSchema = Joi.object({
  codigoReferencia: codigoReferencia.required(),
  notas: notas,
});

const updatePremiosSchema = Joi.object({
  notas: notas,
});

const getPremiosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPremiosSchema, updatePremiosSchema, getPremiosSchema }
