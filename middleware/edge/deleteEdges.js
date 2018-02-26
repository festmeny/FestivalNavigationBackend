var Edge = require('../../models/edge');

module.exports = function(req, res, next){
    var control = req.custom.control;
    Edge.deleteMany({$or: [
        {point_start: control._id},
        {point_end: control._id}
    ]}).exec((err, items) => {
        if (err){
            var error = new Error('cannot delete edges');
            error.status(404);
            return next(new Error());
        }
        res.status(204).send();
    })
};