const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    item: {type: Schema.Types.ObjectId, ref: 'Card'},
    status: {
        type: String, 
        required: [true, 'condition is required'],
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending'
    },
    amount: {
        type: Number,
        min: [0.01, 'Please enter a price above $0']},
},
{timestamps: true}
);

//Collection name is offers in the db
module.exports = mongoose.model('Offer', offerSchema);

