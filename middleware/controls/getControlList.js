var Control = require('../../models/control');
var Map = require('../../models/map');

module.exports = function(req, res, next){
    Map.findById(req.params.mapId)
        .exec((err, item) => {
            if (err || !item){
                var error = new Error('item not found');
                error.status = 404;
                return next(error);
            }

            // Find only control points (not interest points)
            Control.find({map: req.params.mapId, name: {$exists: false}})
                .exec((err, items) => {

                    if (err){
                        var error = new Error('cannot find controls');
                        error.status = 500;
                        return next(error);
                    }

                    req.custom.controls = items;
                    return next();
                });
        });
};