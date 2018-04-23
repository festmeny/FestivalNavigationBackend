module.exports = async function(req, res, next){
    console.log(typeof req.query.current_lat);
    if (req.query.current_lon === undefined ||
        req.query.current_lat === undefined ||
        req.query.destination_point_id === undefined ||
        isNaN(req.query.current_lon) ||
        isNaN(req.query.current_lat)){
        var error = new Error('bad input parameter');
        error.status = 400;
        return next(error);
    }

    return next();
}