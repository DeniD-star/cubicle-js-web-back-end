const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type:String, required: true},
    description: {type: String, required: true, maxLength: 500},
    imageUrl: {type: String, required: true, match: /^https?:\/\//},
   
    //comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = model('Accessory', schema)