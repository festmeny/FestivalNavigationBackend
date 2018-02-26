var Geolib = require('geolib');

var Edge = require('../../models/edge');
var Control = require('../../models/control');


module.exports = function(req, res, next){

    var startPoint = req.custom.point;
    var endPointIds = req.body.neighbors;
    var map = req.custom.map;

    // First delete all edges with startId
    Edge.deleteMany({$or: [
        {point_start: startPoint._id},
        {point_end: startPoint._id}
    ]}, (err, items) => {
        if (err){
            var error = new Error('cannot clear edges');
            error.status = 500;
            return next(error);
        }
    })

    if (endPointIds === undefined){
        return next();
    }

    endPointIds.forEach((element, index) => {
        endPointIds[index] = element.id;
    });

    Control.find({
        '_id': { $in: endPointIds}
    })
    .exec((err, endPoints) => {
        if (err){
            var error = new Error('cannot get controls');
            error.status = 500;
            return next(error);
        }

        Edge.create(endPoints.map( endPoint=> {
            return {
                point_start: startPoint._id,
                point_end: endPoint._id,
                map: map,
                length: Geolib.getDistance(
                    {latitude: startPoint.lat, longitude: startPoint.lon},
                    {latitude: endPoint.lat, longitude: endPoint.lon}
                )
            }
        })).then(items => {
            items.forEach((value, index) => {
                // TODO: FIX THIS!!!
                items[index].point_end.lat = endPoints[index].lat;
                items[index].point_end.lon = endPoints[index].lon;
            })
            req.custom.point.edges = items;
            return next();
        }).catch(err => {
            var error = new Error('cannot create edges');
            error.status = 500;
            return next(error);
        })
    });
};