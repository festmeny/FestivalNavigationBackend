module.exports = function(req, res, next){

    // Don't need to render in update
    if (req.method == 'PUT'){
        res.status(200).send();
    }

    var control = req.custom.point;

    if (control.edges === undefined){
        control.edges = [];
    }

    res.json( {
        id: control._id,
        lat: control.lat,
        lon: control.lon,
        neighbors: control.edges.map(edge => {
            return {
                id: edge.point_end._id,
                lat: edge.point_end.lat,
                lon: edge.point_end.lon,
                length: edge.length
            };
        })
    })
}