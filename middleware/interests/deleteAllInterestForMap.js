var Interest = require('../../models/interest');

module.exports = function(req, res, next){
    Interest.remove({map: req.params.mapId},
        (err) => {
        if (err){
            var error = new Error('cannot delete interest points');
            error.status(404);
            return next(new Error());
        }

        return next();
    });
};