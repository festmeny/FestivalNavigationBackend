var Interest = require('../../models/interest');
var Map = require('../../models/map');

module.exports = function(req, res, next){
    if (!req.body.lat || !req.body.lon || !req.body.name || !req.body.type){
        var error = new Error('request object invalid');
        error.status = 400;
        return next(error);
    }

    req.body.opening_hours = req.body.opening_hours || {};
    req.body.opening_hours.all = req.body.opening_hours.all || [];

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
    }else if (!!req.params.interestId){
        Interest.findById(req.params.interestId,
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