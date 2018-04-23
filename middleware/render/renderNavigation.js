module.exports = function(req, res, next){

    // Make map from point list for accessing lat lon from id
    var points = new Map();
    req.custom.points.forEach(point => {
        points.set(point._id.toString(), point);
    });
 
    var renderedNavigation = {
        path: req.custom.path.map(pointId => {
            point = points.get(pointId);
            return{
                id: pointId,
                lat: point.lat,
                lon: point.lon
            };
        }),
        length: req.custom.pathLength
    }

    res.json(renderedNavigation);
};