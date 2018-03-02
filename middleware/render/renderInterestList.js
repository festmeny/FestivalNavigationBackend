module.exports = function(req, res, next){

    var interests = req.custom.points;

    var renderedInterests = [];
    interests.forEach(interest => {

        var renderedItem = {
            id: interest._id,
            lat: interest.lat,
            lon: interest.lon,
            name: interest.name,
            type: interest.type.name,
            description: interest.description,
            open_now: getOpenNow(interest.opening_hours),
            opening_hours: interest.opening_hours.map( (value, index) => {
                    return {
                        open: value.open,
                        close: value.close
                    }
                }),
            neighbors: getRenderedNeighbors(interest)
        }
        renderedInterests.push(renderedItem);
    });
    res.json( {
        interests: renderedInterests
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

function getRenderedNeighbors(interest){
    if (interest.edges === undefined){
        return [];
    }else{
        return interest.edges.map(edge => {
            if (edge.point_start.lat === interest.lat && edge.point_start.lon === interest.lon)
                return {
                    id: edge.point_end._id,
                    lat: edge.point_end.lat,
                    lon: edge.point_end.lon,
                    length: edge.length
                };
            else if (edge.point_end.lat === interest.lat && edge.point_end.lon === interest.lon){
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
}