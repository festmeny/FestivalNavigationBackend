var search_tools = require('graph-search');
var Geolib = require('geolib');

module.exports = function(req, res, next){

    var edges = req.custom.edges.map(edge => {
        return {
            nodes: [edge.point_start._id, edge.point_end._id],
            cost: edge.length
        }
    })

    var estimate = req.custom.points.map( point => {
        // TODO: Make efficent
        var isolated = true;
        for( var i = 0; i<req.custom.edges.length; i++ ){
            if (req.custom.edges[i].point_start._id.toString() == point._id.toString() ||
                req.custom.edges[i].point_end._id.toString() == point._id.toString()){
                isolated = false;
                break;
            }
        }

        if (isolated){
            return {
                nodes: [point._id, req.query.destination_point_id],
                cost: Infinity
            }
        }else{
            return {
                nodes: [point._id, req.query.destination_point_id],
                cost: Geolib.getDistance(
                    {latitude: point.lat, longitude: point.lon},
                    {latitude: req.custom.dest.lat, longitude: req.custom.dest.lon}
                )
            }
        }
    })

    // Get nearest control point from user location
    var nearestPoint;
    var shorestDistance = Infinity;
    req.custom.points.forEach(point => {
        // TODO: Make efficent
        var isolated = true;
        for( var i = 0; i<req.custom.edges.length; i++ ){
            if (req.custom.edges[i].point_start._id.toString() == point._id.toString() ||
                req.custom.edges[i].point_end._id.toString() == point._id.toString()){
                isolated = false;
                break;
            }
        }

        if (isolated)
            return;

        var distance = Geolib.getDistance(
            {latitude: point.lat, longitude: point.lon},
            {latitude: req.query.current_lat, longitude: req.query.current_lon}
        )

        if (distance < shorestDistance){
            shorestDistance = distance;
            nearestPoint = point;
        }
    });

    console.log(nearestPoint, shorestDistance);

    // Set first edge
    estimate.push({
        nodes: ["start", nearestPoint._id],
        cost: shorestDistance
    });
    edges.push({
        nodes: ["start", nearestPoint._id],
        cost: shorestDistance
    });

    var finalPath = search_tools.depth_first({
        initial_states: ["start"],
        terminal_states: [req.query.destination_point_id],
        edges: edges,
        estimate: estimate
    });

    // Remove "start"
    finalPath.route.shift();

    req.custom.path = finalPath.route;
    req.custom.pathLength = finalPath.cost;
    return next();
};