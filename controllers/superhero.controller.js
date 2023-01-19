const {Superhero, Superpower, Image} = require('../models');

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const {body: {nickname, realName, catchPhrase, originDescription}, powers} = req;
        const createdHero = await Superhero.create({nickname, realName, catchPhrase, originDescription});
        await powers.map(async pow => {
            await createdHero.addSuperpower(pow);
        });
        res.status(201).send(createdHero);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneSuperhero = async (req, res, next) => {
    try {
        // const {superheroInstance} = req;
        // const superpowers = await superheroInstance.getSuperpowers();
        // res.status(200).send({superheroInstance, superpowers});
        const {params: {heroId}} = req;
        const hero = await Superhero.findByPk(heroId, {
            include: [{
                model: Superpower,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id']
                }
            }]
        });
        if(!hero) {
            throw new NotFoundError('Superhero not found');
        }
        res.status(200).send(hero);
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
        const {params: {heroId}, body: {nickname, realName, catchPhrase, originDescription}, powers} = req;
        const [rowCount, [updatedHero]] = await Superhero.update({nickname, realName, catchPhrase, originDescription}, {
            where: {
                id: heroId
            },
            returning: true
        });
        await powers.map(async pow => {
            if(!await updatedHero.hasSuperpower(pow))
            await updatedHero.addSuperpower(pow);
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