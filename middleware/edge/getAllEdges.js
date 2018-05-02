var Edge = require('../../models/edge');
var Map = require('../../models/map');

module.exports = function(req, res, next){
    Map.findById(req.params.mapId)
        .exec((err, item) => {
            if (err || !item){
                var error = new Error('item not found');
                error.status = 404;
                return next(error);
            }

            Edge.find({map: req.params.mapId})
                .populate('point_start')
                .populate('point_end')
                .exec((err, items) => {

                    if (err){
                        var error = new Error('cannot find edges');
                        error.status = 500;
                        return next(error);
                    }

                    req.custom.edges = items;
                    return next();
                });
        });
};