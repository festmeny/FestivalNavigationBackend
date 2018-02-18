var db = require('../config/db');

var Schema = db.Schema;

var typeOfInterestSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    }
}, { collection: 'type_of_interest' })

var TypeOfInterest = db.model("type_of_interest", typeOfInterestSchema);

module.exports = TypeOfInterest;