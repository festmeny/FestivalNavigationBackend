var Edge = require('../../models/edge');

module.exports = function(req, res, next){
    Edge.remove({map: req.params.mapId},
        (err) => {
        if (err){
            var error = new Error('cannot delete edges');
            error.status(404);
            return next(new Error());
        }

        return next();
    });
};