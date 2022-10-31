const {Schema , model} = require('mongoose');


const schema = new Schema({
    username: {type: String, required: true, unique: true},//unique: true nqma da ni e polezno za validaciq, no tova 6te pomogne za indeksiraneto v bazata danni, toest turseneto v neq
    //imaiki index vurhu poleto username, tova 6te ni pozvoli da tursem po-burso v database(primenrno ako tursim nqkakuv regex, nqma da se izpulnqva vurhu dannite , ami vurhu indeksa, koeto e mnogo po-kompaktno i to4no)
    hashedPassword: {type: String, required: true},//bcrypt avtomati4no suhranqva solta vutre v hashedPassworda
});

module.exports = model("User", schema );