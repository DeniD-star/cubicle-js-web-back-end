const {Schema , model} = require('mongoose');


const schema = new Schema({
    username: {type: String, required: true},
    hashedPassword: {type: String, required: true},//bcrypt avtomati4no suhranqva solta vutre v hashedPassworda
});

module.exports = model("User", schema );