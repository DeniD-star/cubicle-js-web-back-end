//tova 6te e na6iq middleware(funkziq koqto stoi mejdu rutera i actiona, funkciq na koqto i se zaka4a funkzionalnost),
//koqto 6te se zanimava s bazata danni

//poneje zarejdaneto na danni e async operaciq, nemoje prosto da se require-ne, trqbva da se inizializira, za celta 6te si napravim data.json


//load and parse data file
//provide ability to:
//-read all entries
//-read single entry by ID
//-add new entry
//-*get matching entries by search criteria

const Cube = require('../models/Cube');



async function init() {
    

    return (req, res, next)=>{//next ni e podadeno ot express, to se dava na middlewarite
        req.storage = {
            getAll,
            getById,
            create,
            edit
        }

        next();
    }

}

async function getAll(query) {
    
  const options = {};
//    let cubes= Object
//    .entries(data)
//    .map(([id, v]) => Object.assign({}, { id }, v));
//     //filter cubes by query params

    if(query.search){
        options.name = {$regex: query.search, $options: 'i'}
        //cubes= cubes.filter(c=> c.name.toLowerCase().includes(query.search.toLowerCase()))
    }
    if(query.from){
        options.difficultyLevel = { $gte: Number(query.from)}
        //cubes= cubes.filter(c=> c.difficultyLevel >= Number(query.from))
    }
    if(query.to){
        options.difficultyLevel = options.difficultyLevel || {};
        options.difficultyLevel.$lte = Number(query.to);
        //cubes= cubes.filter(c=> c.difficultyLevel <= Number(query.to))
    }
const cubes= Cube.find(options).lean();
 return cubes;
}
async function getById(id) {
    //tuk ne e nujna validaciq , tui kato ako imame undefined, ve4e samiq controller 6te prenaso4i kum 404
    const cube = await Cube.findById(id).lean();
    if(cube){
        return cube;
    }else{
        return undefined;
    }
    
}

async function create(cube) {//no mojem da ostavim vse pak asynka tuk, za da razpoznava intelisensa 4e tova vse pak e async funkziq, da razpoznava 4e taq f-q 6te vurne promise

    const record = new Cube(cube);
    return record.save();//napisano s return tazi funkziq vru6ta promise, realno toq koito go izvikava , a imenno createcontrolera go awaitva(await req.storage.create(cube))
//save idva ot mongoose, koeto avtomati4no pra6ta zaqvka kum mongodb i tam se suzdava vsi4ko
}

async function edit(id, cube){
    const existing = await Cube.findById(id);

    if(!existing){
        throw new ReferenceError('No such ID in database!')
    }
  //ako hvurli gre6ka,avtomatikamente nadolu se discardva i ne produljava nadolu
  Object.assign(existing, cube);
    return existing.save();
}



module.exports={
    init,
    getAll,
    getById,
    create, 
    edit
}