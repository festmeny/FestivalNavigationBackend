var TypeOfInterest = require('../../models/typeOfInterest');

module.exports = function(req, res, next){
    TypeOfInterest.findOne({name: req.body.type})
        .exec( (err, type) => {
            if (err || !type){
                var error = new Error('not valid type');
                error.status = 404;
                return next(error);
            }

            req.custom.type = type;
            return next();
        });
}