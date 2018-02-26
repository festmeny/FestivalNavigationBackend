var Map = require('../../models/map');

module.exports = function(req, res, next){
    if (    (req.query.lon === undefined && req.query.lat !== undefined) ||
            (req.query.lon !== undefined && req.query.lat === undefined)){
        var error = new Error('bad input parameter (likely only one of lat and lon is presented not both)');
        error.status = 400;
        return next(error);
    }
    
    Map.find({})
        .exec((err, items) => {

            if (err){
                var error = new Error('cannot find maps');
                error.status = 400;
                return next(error);
            }

            req.custom.maps = items;
            return next();
        });
};