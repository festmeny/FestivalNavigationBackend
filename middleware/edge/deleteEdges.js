var Edge = require('../../models/edge');

module.exports = function(req, res, next){
    var point = req.custom.control || req.custom.interest;
    Edge.deleteMany({$or: [
        {point_start: point._id},
        {point_end: point._id}
    ]}).exec((err, items) => {
        if (err){
            var error = new Error('cannot delete edges');
            error.status(404);
            return next(new Error());
        }
        res.status(204).send();
    })
};