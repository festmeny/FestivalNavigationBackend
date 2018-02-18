var db = require('../config/db');

var Schema = db.Schema;

var interestSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        index: true, unique: true, sparse: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'type_of_interest',
        required: true
    },
    description: Schema.Types.String,
    opening_hours: [{
        open: Schema.Types.Date,
        close: Schema.Types.Date
    }]
},
{
    discriminatorKey: 'kind',
    collection: 'interest'
})

var cp = db.model("control");

var Interest = cp.discriminator('interest', interestSchema);

module.exports = Interest;