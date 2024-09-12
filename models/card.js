const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardScehma = new Schema({
    title: {type: String, required: [true, 'title is required']},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, 
        required: [true, 'description is required'], 
        minLength: [10, 'the description should atleast have 10 characters']
    },
    price: {type: Number, 
        required: [true, 'price is required'],
        min: [0.01, 'minimum price is $1']
        },
    condition: {type: String, 
        required: [true, 'condition is required'],
        enum: ['Mint', 'Excellent', 'Good', 'Fair', 'Poor']
    },
    image: {type: String, required: [true, 'image is required']},
    totalOffers: {type: Number, default: 0},
    highestOffer: {type: Number, default: 0},
    active: {type: Boolean, default: true}
},
{timestamps: true}
);

//Collection name is cards in the db
module.exports = mongoose.model('Card', cardScehma);

