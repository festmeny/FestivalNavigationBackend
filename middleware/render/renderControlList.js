module.exports = function(req, res, next){
    var points = req.custom.controls;

    // TODO: Make valid inside
    var renderedControls = []
    points.forEach(element => {
        var renderedNeighbors;
        if (element.edges === undefined){
            renderedNeighbors = [];
        }else{
            renderedNeighbors = element.edges.map(edge => {
                if (edge.point_start.lat === element.lat && edge.point_start.lon === element.lon)
                    return {
                        id: edge.point_end._id,
                        lat: edge.point_end.lat,
                        lon: edge.point_end.lon,
                        length: edge.length
                    };
                else if (edge.point_end.lat === element.lat && edge.point_end.lon === element.lon){
                    return {
                        id: edge.point_start._id,
                        lat: edge.point_start.lat,
                        lon: edge.point_start.lon,
                        length: edge.length
                    };
                }else{
                    var error = new Error('cannot render neighbors');
                    error.status = 500;
                    return next(error);
                }
            })
        }

        var renderedItem = {
            id: element._id,
            lat: element.lat,
            lon: element.lon,
            neighbors: renderedNeighbors
        };
        renderedControls.push(renderedItem);
    });
    
    res.json({
        controls: renderedControls
    });
};