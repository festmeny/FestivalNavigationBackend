var Map = require('../../models/map');

module.exports = function(req, res, next){
    var map = req.custom.map;

    // TODO: Make valid inside
    var renderedMap = {
        id: map._id,
        inside: false,
        name: map.name,
            bounds: {
                top_left: {
                    lat: map.bounds.top_left.lat,
                    lon: map.bounds.top_left.lon
                },
                bottom_right: {
                    lat: map.bounds.bottom_right.lat,
                    lon: map.bounds.bottom_right.lon
                }
            }
    }

    res.json(renderedMap);
};