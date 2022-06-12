const express = require('express');

const CodigosService = require('./../services/codigos.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCodigoSchema, updateCodigoSchema, getCodigoSchema } = require('../schemas/codigos.schema');

const router = express.Router();
const service = new CodigosService();

router.get('/', async (req, res, next) => {
  try {
    const codigos  = await service.find();
    res.json(codigos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCodigoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const codigo = await service.findOne(parseInt(id));
      res.json(codigo);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCodigoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const  newCodigo = await service.create(body);
      res.status(201).json( newCodigo);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCodigoSchema, 'params'),
  validatorHandler(updateCodigoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const codigo = await service.update(id, body);
      res.json(codigo);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCodigoSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

