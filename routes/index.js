const express = require('express');

const refeidosRouter = require('./referidos.router');
const premiosRouter = require('./premios.router');
const codigosRouter = require('./codigos.router');
//const home = require('rs/html/home.html')


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/referidos', refeidosRouter);
  router.use('/premios', premiosRouter);
  router.use('/codigos', codigosRouter);
  
  
}

module.exports = routerApi;
