var Interest = require('../../models/interest');

module.exports = function(req, res, next){
    Interest.findById(req.params.interestId)
        .exec((err, item) => {

            if (err || !item){
                var error = new Error('cannot find interest');
                error.status = 404;
                return next(error);
            }

            req.custom.interest = item;
            return next();
        });
};