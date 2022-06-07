const Joi = require('joi');

const id = Joi.string()
const idReferido = Joi.string()
const nota = Joi.string().max(250)

const createPremiosSchema = Joi.object({
  idReferido: idReferido.required(),
  nota: nota,
});

const updatePremiosSchema = Joi.object({
  idReferido: idReferido,
  nota: nota,
});

const getPremiosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createPremiosSchema, updatePremiosSchema, getPremiosSchema }
