var Geolib = require('geolib');

var Map = require('../../models/map');

module.exports = function(req, res, next){
    var maps = req.custom.maps;

    var renderedMaps = []
    maps.forEach(element => {

        var inside;
        if (req.query.lat && req.query.lon){
            inside = Geolib.isPointInside(
                {latitude: Number(req.query.lat), longitude: Number(req.query.lon)},
                [
                    {latitude: element.bounds.top_left.lat, longitude: element.bounds.top_left.lon},
                    {latitude: element.bounds.top_left.lat, longitude: element.bounds.bottom_right.lon},
                    {latitude: element.bounds.bottom_right.lat, longitude: element.bounds.bottom_right.lon},
                    {latitude: element.bounds.bottom_right.lat, longitude: element.bounds.top_left.lon}
                ]
            );
        }else{
            inside = false;
        }

        var renderedItem = {
            id: element._id,
            inside: inside,
            name: element.name,
            bounds: {
                top_left: {
                    lat: element.bounds.top_left.lat,
                    lon: element.bounds.top_left.lon
                },
                bottom_right: {
                    lat: element.bounds.bottom_right.lat,
                    lon: element.bounds.bottom_right.lon
                }
            }
        };
        renderedMaps.push(renderedItem);
    });
    
    res.json({
        maps: renderedMaps
    });
};