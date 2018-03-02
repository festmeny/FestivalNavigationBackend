var express = require('express');
var router = express.Router();

var TypeOfInterest = require('../models/typeOfInterest');
//var MakeDummyDb = require('../middleware/utils/makeDummyDb');

router.use('/create_types', function(req, res, next) {
    var processedTypeCounter = 0;
    var types = ['stage', 'entrance', 'charging-point', 'wc', 'camping', 'food', 'bar', 'info', 'shop'];
    types.forEach( (type, index) => {
        TypeOfInterest.findOneAndUpdate({name: type}, {type: type}, {upsert: true, new: true}, (err, item)=> {
            console.log(item);
            processedTypeCounter++;
            if (processedTypeCounter === types.length){
                res.send("Types created");
            }
        })
    });
});

/*router.use('/make_dummy_db', 
    MakeDummyDb
)*/

module.exports = router;
