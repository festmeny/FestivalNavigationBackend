var Control = require('../../models/control');

module.exports = function(req, res, next){

    Control.find({lat: req.body.lat, lon: req.body.lon})
    .exec((err, items) => {
        if (items !== undefined && items.length > 1){
            var error = new Error('a control point already exists with given coordinates');
            error.status = 409;
            return next(error);
        }else if (items !== undefined && items.length == 1 && items[0]._id != req.params.controlId){
            var error = new Error('a control point already exists with given coordinates');
            error.status = 409;
            return next(error);
        }

        Control.findByIdAndUpdate(
            req.params.controlId,{
            lat: req.body.lat,
            lon: req.body.lon
        }).then(point => {
            req.custom.point = point;
            req.custom.map = point.map;
            res.status(200);
            return next();
        }).catch(err => {
            var error = new Error('a control point already exists with given coordinates');
            error.status = 409;
            return next(error);
        });

    });
};