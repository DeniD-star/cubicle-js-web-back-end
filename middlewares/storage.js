//tova 6te e na6iq middleware(funkziq koqto stoi mejdu rutera i actiona, funkciq na koqto i se zaka4a funkzionalnost),
//koqto 6te se zanimava s bazata danni

//poneje zarejdaneto na danni e async operaciq, nemoje prosto da se require-ne, trqbva da se inizializira, za celta 6te si napravim data.json


//load and parse data file
//provide ability to:
//-read all entries
//-read single entry by ID
//-add new entry
//-*get matching entries by search criteria



const productService = require('../services/product');
const accessoryService = require('../services/accessory');


async function init() {
    

    return (req, res, next)=>{//next ni e podadeno ot express, to se dava na middlewarite


        // req.storage = {
        //     getAll: productService.getAll,
        //     getById: productService.getById,
        //     create: productService.create,
        //     edit: productService.edit,
        //     createComment: productService.createComment,
        //     createAccessory:accessoryService.createAccessory,
        //     getAllAccessories: accessoryService.getAllAccessories,
        //     attachSticker: productService.attachSticker
        // }

//Questa riga sarebbe quello che ho scritto su
        const storage = Object.assign({}, productService, accessoryService);
        req.storage = storage;

        next();
    }

}

module.exports = init;





