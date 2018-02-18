var db = require('../config/db');

var Schema = db.Schema;

var mapSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    bounds: {
        top_left: {
            lat: Schema.Types.Number,
            lon: Schema.Types.Number
        },
        bottom_right: {
            lat: Schema.Types.Number,
            lon: Schema.Types.Number
        }
    }
}, { collection: 'map' })

var Map = db.model('map', mapSchema);

module.exports = Map;