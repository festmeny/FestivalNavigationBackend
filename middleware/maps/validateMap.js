var Map = require('../../models/map');

module.exports = function(req, res, next){
    if (req.body.name === undefined){
        var error = new Error('request object invalid');
        error.status = 400;
        return next(error);
    }

    if (!!req.params.mapId){
        Map.findById(req.params.mapId,
            (err, item) => {
                if (err || !item){
                    var error = new Error('item not found');
                    error.status = 404;
                    return next(error);
                }
                return next();
        })
    }else{
        return next();
    }
};