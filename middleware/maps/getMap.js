var Map = require('../../models/map');

module.exports = function(req, res, next){
    Map.findOne({ _id: req.params.mapId})
        .exec((err, item) => {

            if (err || !item){
                var error = new Error('cannot find map');
                error.status = 404;
                return next(error);
            }

            req.custom.map = item;
            return next();
        });
};