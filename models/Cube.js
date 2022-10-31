const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 500 },
    imageUrl: {
        type: String, required: true,
        validate: {//object validate, koito ima kato svoistvo funkciqta validator i suotvetno message
            validator(value) {
                return /^https?:\/\//.test(value)
            },
            message: 'Image must be a valid URL!'
        }
    },
    difficultyLevel: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Cube', schema)