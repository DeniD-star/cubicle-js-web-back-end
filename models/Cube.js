const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name is required!'] },
    description: { type: String, required: [true, 'Description is required!'], maxLength: 500 },
    imageUrl: {
        type: String, required:[ true, 'Image must be a valid URL!'],
        validate: {//object validate, koito ima kato svoistvo funkciqta validator i suotvetno message
            validator(value) {
                return /^https?:\/\//.test(value)
            },
           
        }
    },
    difficultyLevel: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Cube', schema)