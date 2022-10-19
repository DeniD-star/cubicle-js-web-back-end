//tova 6te e na6iq middleware(funkziq koqto stoi mejdu rutera i actiona, funkciq na koqto i se zaka4a funkzionalnost),
//koqto 6te se zanimava s bazata danni

//poneje zarejdaneto na danni e async operaciq, nemoje prosto da se require-ne, trqbva da se inizializira, za celta 6te si napravim data.json


//load and parse data file
//provide ability to:
//-read all entries
//-read single entry by ID
//-add new entry
//-*get matching entries by search criteria


const fs = require('fs/promises');
const uniqid = require('uniqid');
let data = {};

async function init() {
    try {
        data = JSON.parse(await fs.readFile('./models/data.json'))
        //buffer , parsnato 6te vurne string
    } catch (err) {
        console.error('Error reading database')
    }

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
    let cubes= Object
    .entries(data)
    .map(([id, v]) => Object.assign({}, { id }, v));

    //filter cubes by query params

    if(query.search){
        cubes= cubes.filter(c=> c.name.toLowerCase().includes(query.search.toLowerCase()))
    }
    if(query.from){
        cubes= cubes.filter(c=> c.difficultyLevel >= Number(query.from))
    }
    if(query.to){
        cubes= cubes.filter(c=> c.difficultyLevel <= Number(query.to))
    }
    return cubes;
}
async function getById(id) {
    //tuk ne e nujna validaciq , tui kato ako imame undefined, ve4e samiq controller 6te prenaso4i kum 404
    const cube = data[id];
    if(cube){
        return Object.assign({}, {id}, cube)
    }else{
        return undefined;
    }
    
}

async function create(cube) {
   const id = uniqid();
 
    data[id] = cube;

  await persist();



}

async function edit(id, cube){
    data[id] = cube;

    if(!data[id]){
        throw new ReferenceError('No such ID in database!')
    }
  //ako hvurli gre6ka,avtomatikamente nadolu se discardva i ne produljava nadolu
    await persist();
}

async function persist(){
    try {
       
       await fs.writeFile('./models/data.json', JSON.stringify(data, null, 2))
      
    } catch (err) {
        
        console.error('Error writing out database')

    }
}

module.exports={
    init,
    getAll,
    getById,
    create, 
    edit
}