const { Superpower } = require('../models');

module.exports.addSuperpower = async (req, res, next) => {
    try {
        const {body: {superpower}} = req;
        const powers = [];
        await superpower.map(async power => {
            const findedPower = await Superpower.findOne({
                where: {
                    superpower: power
                }
            });
            if(findedPower === null){
                const createdSuperpower = await Superpower.create({superpower: power});
                powers.push(createdSuperpower);
                req.powers = powers;
                next();
            } else {
                powers.push(findedPower);
                req.powers = powers;
                next();
            }
            // next();
        })
    } catch (error) {
        next(error)
    }
}
