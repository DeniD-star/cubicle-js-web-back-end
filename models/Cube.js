const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type:String, required: true},
    description: {type: String, required: true, minLength: 500},
    imageUrl: {type: String, required: true, match: /^https?:\/\//},
    difficultyLevel: {type:Number, min: 1, max: 6}
})

module.exports = model('Cube', schema)