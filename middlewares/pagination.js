module.exports.pagination = async (req, res, next) => {
    try {
        const {query} = req;
        const limit = query.limit || 5;
        req.pagination = {
            limit,
            offset: (query.page - 1) * limit
        }
        next();
    } catch (error) {
        next(error)
    }
}