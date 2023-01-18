const {Router} = require('express');
const superheroRouter = require('./superheroRouter');

const rootRouter = Router();

rootRouter.use('/hero', superheroRouter); 

module.exports = rootRouter;