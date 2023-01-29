const { Superpower } = require('../models');

module.exports.addSuperpower = async (req, res, next) => {
    try {
        const {body: {superpower}} = req;
        const powers = [];
        if(superpower){
            superpower.split(',').map(suppow=>suppow.trim().toLowerCase()).map(async power => {
                const findedPower = await Superpower.findOne({
                    where: {
                        superpower: power
                    }
                });
                if(findedPower === null){
                    const createdSuperpower = await Superpower.create({superpower: power});
                    powers.push(createdSuperpower);
                } else {
                    powers.push(findedPower);
                }
            });
            
            req.powers = powers;
            next();

        } else {next()};
        
    } catch (error) {
        next(error)
    }
}
