var Interest = require('../../models/interest');

module.exports = function(req, res, next){
    var interest = req.custom.interest;
    
    interest.remove((err) => {
        if (err){
            var error = new Error('cannot delete interest');
            error.status(404);
            return next(new Error());
        }
        return next();
        //res.status(204).send();
    });
};