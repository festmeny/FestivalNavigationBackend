var Control = require('../../models/control');

module.exports = function(req, res, next){

    Control.find({lat: req.body.lat, lon: req.body.lon})
    .exec((err, items) => {
        if (items !== undefined && items.length !== 0){
            var error = new Error('a control point already exists with given coordinates');
            error.status = 409;
            return next(error);
        }

        Control.create({
            lat: req.body.lat,
            lon: req.body.lon,
            map: req.params.mapId
        }).then(point => {
            req.custom.point = point;
            req.custom.map = req.params.mapId;
            res.status(201);
            return next();
        }).catch(err => {
            var error = new Error('a control point already exists with given coordinates');
            error.status = 409;
            return next(error);
        });

    });
};