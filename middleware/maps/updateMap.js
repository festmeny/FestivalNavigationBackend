var Map = require('../../models/map');

module.exports = function(req, res, next){
    Map.findByIdAndUpdate(
        req.params.mapId, {
        name: req.body.name,
        bounds: {
            top_left: {
                lat: req.body.bounds.top_left.lat,
                lon: req.body.bounds.top_left.lon
            },
            bottom_right: {
                lat: req.body.bounds.bottom_right.lat,
                lon: req.body.bounds.bottom_right.lon
            }
        }
    }, {new: true}
    ).then((item) => {
        console.log(item);
        req.custom.map = item;
        return next();
    }).catch(err => {
        var error = new Error('a map already exists with requested name');
        error.status = 409;
        return next(error);
    })

};