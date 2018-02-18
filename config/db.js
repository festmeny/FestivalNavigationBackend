var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/festival_navigation';

mongoose.connect(url, function(err, db){
    if (err) {
        console.log('Unable to connect to MongoDB server.', err)
    }else{
        console.log('Connected to MongoDB server on', url)
    }
});

module.exports = mongoose;