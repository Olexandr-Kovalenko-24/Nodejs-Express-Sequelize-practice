const {Superhero} = require('../models');

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const {body: {nickname, realName, catchPhrase, originDescription}} = req;
        const createdHero = await Superhero.create({nickname, realName, catchPhrase, originDescription});
        res.status(201).send(createdHero);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneSuperhero = async (req, res, next) => {
    try {
        const {superheroInstance} = req;
        res.status(200).send(superheroInstance);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const {pagination} = req;
        const findedSuperheroes = await Superhero.findAll({
            ...pagination
        });
        res.status(200).send(findedSuperheroes);
    } catch (error) {
        next(error);
    }
}

module.exports.updateSuperhero = async (req, res, next) => {
    try {
        const {params: {heroId}, body: {nickname, realName, catchPhrase, originDescription}} = req;
        const [rowCount, [updatedHero]] = await Superhero.update({nickname, realName, catchPhrase, originDescription}, {
            where: {
                id: heroId
            },
            returning: true
        });
        res.status(200).send(updatedHero);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteSuperhero = async (req, res, next) => {
    try {
        const {superheroInstance} = req;
        const deletedHero = await superheroInstance.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}