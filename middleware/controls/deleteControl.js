var Control = require('../../models/control');

module.exports = function(req, res, next){
    var control = req.custom.control;
    
    control.remove((err) => {
        if (err){
            var error = new Error('cannot delete map');
            error.status(404);
            return next(new Error());
        }
        return next();
        //res.status(204).send();
    });
};