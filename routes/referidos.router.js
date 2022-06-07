const express = require('express');

const ReferidosService = require('../services/referidos.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createReferidosSchema,  updateReferidosSchema, getReferidosSchema } = require('../schemas/referidos.schema');

const router = express.Router();
const service = new ReferidosService();

router.get('/', async (req, res, next) => {
  try {
    const referidos = await service.find();
    res.json(referidos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getReferidosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const referido = await service.findOne(id);
      res.json(referido);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createReferidosSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newReferido = await service.create(body);
      res.status(201).json(newReferido);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getReferidosSchema, 'params'),
  validatorHandler(updateReferidosSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const referido = await service.update(id, body);
      res.json(referido);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getReferidosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
