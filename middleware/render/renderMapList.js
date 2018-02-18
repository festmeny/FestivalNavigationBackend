var Map = require('../../models/map');

module.exports = function(req, res, next){
    var maps = req.custom.maps;

    // TODO: Make valid inside
    var renderedMaps = []
    maps.forEach(element => {
        var renderedItem = {
            id: element._id,
            inside: false,
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