var Control = require('../../models/control');

module.exports = async function(req, res, next){
    Control.find({map: req.custom.map})
    .exec( (err, items) => {

        if (err){
            var error = new Error('cannot find control points');
            error.status = 500;
            return next(error);
        }

        req.custom.points = items;
        return next();
    })
}