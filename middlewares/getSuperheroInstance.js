const {Superhero} = require('../models');
const NotFoundError = require('../errors/NotFound');

module.exports.getSuperheroInstance = async(req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Superhero.findByPk(heroId);
        if(hero) {
            req.superheroInstance = hero;
            next();
        } else {
            throw new NotFoundError('Superhero not found');
        }
    } catch (error) {
        next(error)
    }
}