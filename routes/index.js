const {Router} = require('express');
const superheroRouter = require('./superheroRouter');

const rootRouter = Router();

rootRouter.use('/heroes', superheroRouter); 

module.exports = rootRouter;