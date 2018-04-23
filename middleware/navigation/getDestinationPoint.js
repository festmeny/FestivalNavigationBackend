var Control = require('../../models/control');

module.exports = async function(req, res, next){
    Control.findById(req.query.destination_point_id)
    .exec( (err, point) => {

        if (err){
            var error = new Error('cannot find destination point');
            error.status = 404;
            return next(error);
        }

        req.custom.dest = point;
        req.custom.map = point.map;
        return next();
    })
}