var db = require('../config/db');

var Schema = db.Schema;

var edgeSchema = new Schema({
    point_start: {
        type: Schema.Types.ObjectId,
        ref: 'control'
    },
    point_end: {
        type: Schema.Types.ObjectId,
        ref: 'control'
    },
    length: Schema.Types.Number,
    map: {
        type: Schema.Types.ObjectId,
        ref: 'map'
    }
}, { collection: 'edge' })

var Edge = db.model('edge', edgeSchema);

module.exports = Edge;
