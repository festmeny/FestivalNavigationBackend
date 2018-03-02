var Interest = require('../../models/interest');

module.exports = function(req, res, next){

    Interest.find({lat: req.body.lat, lon: req.body.lon, name: req.body.name})
    .exec((err, items) => {
        if (items !== undefined && items.length > 1){
            var error = new Error('an interest point already exists with given coordinates or name');
            error.status = 409;
            return next(error);
        }else if (items !== undefined && items.length == 1 && items[0]._id != req.params.interestId){
            var error = new Error('an interest point already exists with given coordinates or name');
            error.status = 409;
            return next(error);
        }

        var opening_hours = req.body.opening_hours.all.map( (value, index) => {
            return {
                open: value.open,
                close: value.close
            }
        })

        Interest.findByIdAndUpdate(
            req.params.interestId,{
            lat: req.body.lat,
            lon: req.body.lon,
            map: req.params.mapId,
            name: req.body.name,
            type: req.custom.type._id,
            description: req.body.description,
            opening_hours: opening_hours
        }).then(point => {
            req.custom.point = point;
            req.custom.map = point.map;
            res.status(200);
            return next();
        }).catch(err => {
            var error = new Error('an interest point already exists with given coordinates or name');
            error.status = 409;
            return next(error);
        });

    });
};