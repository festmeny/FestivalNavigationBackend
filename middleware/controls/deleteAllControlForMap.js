var Control = require('../../models/control');

module.exports = function(req, res, next){
    Control.remove({map: req.params.mapId},
        (err) => {
        if (err){
            var error = new Error('cannot delete control list');
            error.status(404);
            return next(new Error());
        }

        return next();
    });
};