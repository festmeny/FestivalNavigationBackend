var Edge = require('../../models/edge');

module.exports = async function(req, res, next){
    Edge.find({map: req.custom.map})
    .populate('point_start')
    .populate('point_end')
    .exec( (err, items) => {

        if (err){
            var error = new Error('cannot find edges');
            error.status = 500;
            return next(error);
        }

        req.custom.edges = items;
        return next();
    })
}