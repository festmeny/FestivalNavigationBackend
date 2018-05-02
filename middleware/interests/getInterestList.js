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

            var query;
            if (!req.custom.type){
                query = {map: req.params.mapId};
            }else{
                query = {map: req.params.mapId, type: req.custom.type._id};
            }

            Interest.find(query)
                .populate('type')
                .exec((err, items) => {

                    if (err){
                        var error = new Error('cannot find interests');
                        error.status = 500;
                        return next(error);
                    }

                    req.custom.interests = items;
                    return next();
                });
        });
};