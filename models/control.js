var db = require('../config/db');

var Schema = db.Schema;

var controlSchena = new Schema({
    lat: {
        type: Schema.Types.Number,
        required: true
    },
    lon: {
        type: Schema.Types.Number,
        required: true
    },
    map: {
        type: Schema.Types.ObjectId,
        ref: 'map'
    }
},{
    discriminatorKey: 'kind',
    collection: 'control'
})

var Control = db.model('control', controlSchena);

module.exports = Control;