const Joi = require('joi');

const id = Joi.number().integer()
const codigoReferencia = Joi.number().integer()
const name = Joi.string().min(3);
const lastName = Joi.string().min(3)
const telephone = Joi.string().min(1).max(40)
const active = Joi.boolean()


const createReferidosSchema = Joi.object({
  codigoReferencia: codigoReferencia.required(),
    // id: id.required(),
  name: name.required(),
  lastName: lastName,
  telephone: telephone.required(),
  active: active,
});

const updateReferidosSchema = Joi.object({
  codigoReferencia: codigoReferencia,
  name: name,
  lastName: lastName,
  telephone: telephone,
  active: active,
});

const getReferidosSchema = Joi.object({
  id: id.required(),
});

module.exports = { createReferidosSchema,  updateReferidosSchema, getReferidosSchema }
