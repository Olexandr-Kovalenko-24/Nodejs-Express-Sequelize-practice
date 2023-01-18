const NotFoundError = require('./errors/NotFound');

module.exports.errorHandler = async(error, req, res, next) => {
    if(error instanceof NotFoundError) {
        res.status(404).send({error: error.message});
    }
    
    return res.status(500).send({error: error.message || 'Server error'});
}