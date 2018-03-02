var Interest = require('../../models/interest');
var Map = require('../../models/map');

module.exports = function(req, res, next){
    Map.findById(req.params.mapId)
        .exec((err, item) => {
            if (err || !item){
                var error = new Error('item not found');
                error.status = 404;
                return next(error);
            }

            Interest.find({map: req.params.mapId})
                .populate('type')
                .exec((err, items) => {

                    if (err){
                        var error = new Error('cannot find interests');
                        error.status = 500;
                        return next(error);
                    }

                    req.custom.points = items;
                    return next();
                });
        });
};