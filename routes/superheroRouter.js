const {Router} = require('express');
const SuperheroController = require('../controllers/superhero.controller');
const {getSuperheroInstance} = require('../middlewares/getSuperheroInstance');
const {pagination} = require('../middlewares/pagination');

const superheroRouter = Router();

superheroRouter.post('/', SuperheroController.createSuperhero);
superheroRouter.get('/:heroId', getSuperheroInstance, SuperheroController.getOneSuperhero);
superheroRouter.get('/', pagination, SuperheroController.getAllSuperheroes);
superheroRouter.put('/:heroId', SuperheroController.updateSuperhero);
superheroRouter.delete('/:heroId', getSuperheroInstance, SuperheroController.deleteSuperhero);



module.exports = superheroRouter;