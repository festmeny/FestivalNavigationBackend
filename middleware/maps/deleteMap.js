var Map = require('../../models/map');

module.exports = function(req, res, next){
    var map = req.custom.map;
    console.log("deleting");
    
    map.remove((err) => {
        if (err){
            var error = new Error('cannot delete map');
            error.status(404);
            return next(new Error());
        }

        res.status(204).send();
    });
};