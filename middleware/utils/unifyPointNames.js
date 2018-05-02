module.exports = function(req, res, next){
    if (req.custom.controls){
        req.custom.points = controls;
    }else if (req.custom.interests){
        req.custom.points = interests;
    }
    return next();
}