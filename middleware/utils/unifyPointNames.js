module.exports = function(req, res, next){
    if (req.custom.controls){
        req.custom.points = req.custom.controls;
    }else if (req.custom.interests){
        req.custom.points = req.custom.interests;
    }
    return next();
}