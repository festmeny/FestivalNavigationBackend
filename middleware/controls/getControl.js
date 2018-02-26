var Control = require('../../models/control');

module.exports = function(req, res, next){
    Control.findById(req.params.controlId)
        .exec((err, item) => {

            if (err || !item){
                var error = new Error('cannot find control');
                error.status = 404;
                return next(error);
            }

            req.custom.control = item;
            return next();
        });
};