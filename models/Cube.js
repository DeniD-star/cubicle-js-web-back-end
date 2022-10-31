const { Schema, model } = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z0-9 ]+$/;
const IMAGE_PATTERN = /^https?:\/\//;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name must be at least 5 characters long'],
        match: [NAME_PATTERN, 'Name must contain only alphanumeric characters!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description must be at least 20 characters long'],
        maxLength: [500, 'Description can not be longer than 500 characters!'],
        match: [NAME_PATTERN, 'Description must contain only alphanumeric characters!']
    },
    imageUrl: {
        type: String, required: [true, 'Image is required!'], match: [IMAGE_PATTERN, 'Image must be a valid image URL!']
        // validate: {//object validate, koito ima kato svoistvo funkciqta validator i suotvetno message
        //     validator(value) {
        //         return /^https?:\/\//.test(value)
        //     },

        // }
    },
    difficultyLevel: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Cube', schema)