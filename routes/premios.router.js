const express = require('express');

const PremiosServices = require('./../services/premios.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createPremiosSchema, updatePremiosSchema, getPremiosSchema } = require('./../schemas/premios.schema');

const router = express.Router();
const service = new PremiosServices();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPremiosSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPremiosSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      if (typeof(newProduct) == 'string' && newProduct.includes("INSERT")) {
        res.status(201).json(newProduct);
      }else{
        res.status(409).json(newProduct);
      }
      
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPremiosSchema, 'params'),
  validatorHandler(updatePremiosSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getPremiosSchema, 'params'),
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
