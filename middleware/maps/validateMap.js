var Map = require('../../models/map');

module.exports = function(req, res, next){
    if (req.body.name === undefined){
        var error = new Error('request object invalid');
        error.status = 400;
        next(error);
    }
    return next();
};