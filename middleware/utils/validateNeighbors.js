var Control = require('../../models/control');

module.exports = function(req, res, next){
    if (req.body.neighbors === undefined || req.body.neighbors.length === 0){
        return next();
    }

    var neighborIds = []
    req.body.neighbors.forEach(neighbor => {
        neighborIds.push(neighbor.id);
    });

    Control.find({_id: { $in: neighborIds }})
    .exec((err, res) => {
        if (err){
            var error = new Error('cannot get neighbors');
            error.status = 404;
            return next(error);
        }
        return next();
    });

}