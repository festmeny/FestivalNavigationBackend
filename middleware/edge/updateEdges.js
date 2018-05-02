var Geolib = require('geolib');

var Edge = require('../../models/edge');
var Control = require('../../models/control');


module.exports = async function(req, res, next){

    var startPoint = req.custom.point;
    var endPointIds = req.body.neighbors;
    var map = req.custom.map;

    if (!endPointIds || endPointIds.length == 0)
        return next();

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

    // Then find all endPoints
    await Control.find({
        _id: { $in: endPointIds}
    }).exec();

    var finalEdges = [];
    endPointIds.forEach(async (endPointId) => {
        
        let endPoint = await Control.findById(endPointId).exec();

        var distance = Geolib.getDistance(
            {latitude: startPoint.lat, longitude: startPoint.lon },
            {latitude: endPoint.lat, longitude: endPoint.lon}
        )

        var piece = distance / 20;
        console.log(piece);

        var prevPoint = startPoint;
        for (var index=1; index <= piece; index++ ){
            try{
                let currentPoint = await Control.create({
                    lat: (((endPoint.lat - startPoint.lat) / piece) * index) + startPoint.lat,
                    lon: (((endPoint.lon - startPoint.lon) / piece) * index) + startPoint.lon,
                    map: map
                });

                await Edge.create({
                    point_start: prevPoint._id,
                    point_end: currentPoint._id,
                    length: Geolib.getDistance(
                        {latitude: prevPoint.lat, longitude: prevPoint.lon },
                        {latitude: currentPoint.lat, longitude: currentPoint.lon}
                    ),
                    map: map
                });
                
                finalEdges.push({
                    point_start: prevPoint._id,
                    point_end: currentPoint._id,
                    length: Geolib.getDistance(
                        {latitude: prevPoint.lat, longitude: prevPoint.lon },
                        {latitude: currentPoint.lat, longitude: currentPoint.lon}
                    )
                })
                prevPoint = currentPoint;
            }catch(e){
                console.log('error:', e);
            }
        }

        await Edge.create({
            point_start: prevPoint._id,
            point_end: endPoint._id,
            length: Geolib.getDistance(
                {latitude: prevPoint.lat, longitude: prevPoint.lon },
                {latitude: endPoint.lat, longitude: endPoint.lon}
            ),
            map: map
        })
        finalEdges.push({
            point_start: prevPoint._id,
            point_end: endPoint._id,
            length: Geolib.getDistance(
                {latitude: prevPoint.lat, longitude: prevPoint.lon },
                {latitude: endPoint.lat, longitude: endPoint.lon}
            )
        })
    });

    req.custom.point.edges = finalEdges;
    return next();

/*
        // And create edges between startPoint and endPoints
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
        */
    
};