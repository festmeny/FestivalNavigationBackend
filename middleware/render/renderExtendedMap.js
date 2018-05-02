module.exports = function(req, res, next){
    var map = req.custom.map;
    var controls = req.custom.controls;
    var interests = req.custom.interests;
    var edges = req.custom.edges;

    res.json({
        id: map._id,
        name: map.name,
        bounds: {
            top_left: {
                lat: map.bounds.top_left.lat,
                lon: map.bounds.top_left.lon
            },
            bottom_right: {
                lat: map.bounds.bottom_right.lat,
                lon: map.bounds.bottom_right.lon
            }
        },
        controls: controls.map(control => {
            return {
                id: control._id,
                lat: control.lat,
                lon: control.lon
            }
        }),
        interests: interests.map(interest => {
            return {
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
                })
            }
        }),
        edges: edges.map(edge => {
            return {
                start: {
                    lat: edge.point_start.lat,
                    lon: edge.point_start.lon
                },
                end: {
                    lat: edge.point_end.lat,
                    lon: edge.point_end.lon
                },
                length: edge.length
            }
        })
    });
};

// TODO: Date.parse not too good
function getOpenNow(openingHours){
    var now = new Date().getTime();
    for (var index = 0; index<openingHours.length; index++){
        if (now >= Date.parse(openingHours[index].open) && now <= Date.parse(openingHours[index].close)){
            return true;
        }
    }
    return false;
}