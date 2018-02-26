var async = require('async');

var Edge = require('../../models/edge');

module.exports = async function(req, res, next){

    var points = req.custom.points;
    if (points === undefined || points.length == 0){
        return next();
    }

    // Make forEach blocking
    var itemProcessed = 0;

    points.forEach((point, index) => {
        Edge.find({$or: [
            {point_start: point._id},
            {point_end: point._id}
        ]})
        .populate('point_start')
        .populate('point_end')
        .exec( (err, items) => {

            if (err){
                var error = new Error('cannot find edges');
                error.status = 500;
                return next(error);
            }

            req.custom.points[index].edges = items;
            itemProcessed++;

            if (itemProcessed === points.length){
                return next();
            }
        })
    })
}