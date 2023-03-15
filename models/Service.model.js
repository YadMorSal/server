const allowedCategories = ['Electricidad', 'Fontanería', 'Carpintería', 'Pequeños arreglos', 'Mantenimiento', 'Pintura', 'Montaje de muebles', 'Otros']
const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.']
    },
    prize: {
        type: Number,
        required: [true, 'Price is required.']

    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],

    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/diwmrtyix/image/upload/v1678725487/rvsoxsr0evxezxjd1hwn.jpg'
    },
    location: {
        type: String,
        required: [true, 'Location is required.']
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: allowedCategories
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }]

}, {
    timestamps: true
});

const Service = model("service", serviceSchema);

module.exports = Service;
