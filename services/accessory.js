const Accessory = require('../models/Accessory');

async function createAccessory(accessory) {//no mojem da ostavim vse pak asynka tuk, za da razpoznava intelisensa 4e tova vse pak e async funkziq, da razpoznava 4e taq f-q 6te vurne promise

    const record = new Accessory(accessory);
    return record.save();
}

async function getAllAccessories(existing){
    return Accessory.find({_id: {$nin: existing} }).lean();
}

module.exports={
   
    createAccessory,
    getAllAccessories
   
}