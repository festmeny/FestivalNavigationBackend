module.exports = function(req, res, next){

    // Don't need to render in update
    if (req.method == 'PUT'){
        res.status(200).send();
    }

    var interest = req.custom.point;

    if (interest.edges === undefined){
        interest.edges = [];
    }

    res.json( {
        id: interest._id,
        lat: interest.lat,
        lon: interest.lon,
        name: interest.name,
        type: req.custom.type.name,
        description: interest.description,
        open_now: getOpenNow(interest.opening_hours),
        opening_hours: interest.opening_hours.map( (value, index) => {
                return {
                    open: value.open,
                    close: value.close
                }
            }),
        neighbors: interest.edges.map(edge => {
            return {
                id: edge.point_end._id,
                lat: edge.point_end.lat,
                lon: edge.point_end.lon,
                length: edge.length
            };
        })
    })
}

function getOpenNow(openingHours){
    var now = new Date().getTime();
    for (var index = 0; index<openingHours.length; index++){
        if (now >= Date.parse(openingHours[index].open) && now <= Date.parse(openingHours[index].close)){
            return true;
        }
    }
    return false;
}