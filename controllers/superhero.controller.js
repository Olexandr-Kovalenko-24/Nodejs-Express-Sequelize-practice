const {Superhero, Superpower, Image} = require('../models');

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
        const {params: {heroId}, body: {nickname, realName, catchPhrase, originDescription, superpower}} = req;
        const [rowCount, [updatedHero]] = await Superhero.update({nickname, realName, catchPhrase, originDescription}, {
            where: {
                id: heroId
            },
            returning: true
        });
        await superpower.map(async power => {
            const findedPower = await Superpower.findOne({
                where: {
                    superpower: power
                }
            });
            if(findedPower === null){
                const createdSuperpower = await Superpower.create({superpower: power});
                const addPowerToHero = await updatedHero.addSuperpower(createdSuperpower);
            } else {
                if(!await updatedHero.hasSuperpower(findedPower)) {
                    await updatedHero.addSuperpower(findedPower);
                }
            }
        })
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