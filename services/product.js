
const Cube = require('../models/Cube');
const Comment = require('../models/Comment');
const Accessory = require('../models/Accessory');

async function getAll(query) {

    const options = {};
    //    let cubes= Object
    //    .entries(data)
    //    .map(([id, v]) => Object.assign({}, { id }, v));
    //     //filter cubes by query params

    if (query.search) {
        options.name = { $regex: query.search, $options: 'i' }
        //cubes= cubes.filter(c=> c.name.toLowerCase().includes(query.search.toLowerCase()))
    }
    if (query.from) {
        options.difficultyLevel = { $gte: Number(query.from) }
        //cubes= cubes.filter(c=> c.difficultyLevel >= Number(query.from))
    }
    if (query.to) {
        options.difficultyLevel = options.difficultyLevel || {};
        options.difficultyLevel.$lte = Number(query.to);
        //cubes= cubes.filter(c=> c.difficultyLevel <= Number(query.to))
    }
    const cubes = Cube.find(options).lean();
    return cubes;
}
async function getById(id) {
    //tuk ne e nujna validaciq , tui kato ako imame undefined, ve4e samiq controller 6te prenaso4i kum 404
    const cube = await Cube
        .findById(id)
        .populate({
            path: 'comments',
            populate: {path: 'author'}
        })
        .populate('accessories')
        .populate('creator')
        .lean();
    if (cube) {
        const viewModel = {
            _id: cube._id,
            name: cube.name, 
            description: cube.description,
            imageUrl: cube.imageUrl,
            difficultyLevel: cube.difficultyLevel,
            comments: cube.comments.map(c=>({content: c.content, author: c.author.username})),
            accessories: cube.accessories,
            creator: cube.creator?.username,
           //creator: cube.creator && cube.creator.username
           creatorId: cube.creator && cube.creator._id
        }
        return viewModel;
    } else {
        return undefined;
    }

}

async function create(cube) {//no mojem da ostavim vse pak asynka tuk, za da razpoznava intelisensa 4e tova vse pak e async funkziq, da razpoznava 4e taq f-q 6te vurne promise

    const record = new Cube(cube);
    return record.save();//napisano s return tazi funkziq vru6ta promise, realno toq koito go izvikava , a imenno createcontrolera go awaitva(await req.storage.create(cube))
    //save idva ot mongoose, koeto avtomati4no pra6ta zaqvka kum mongodb i tam se suzdava vsi4ko
}

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database!')
    }
    //ako hvurli gre6ka,avtomatikamente nadolu se discardva i ne produljava nadolu
    Object.assign(existing, cube);
    return existing.save();
}

async function createComment(cubeId, comment) {
    const cube = await Cube.findById(cubeId);
    console.log(cubeId);
    console.log(cube);

    if (!cube) {
        throw new ReferenceError('No such ID in database!')
    }

    const newComment = new Comment(comment);
    await newComment.save();//purvo spasqvame comenatara , za da mojem da polu4im id, koeto ni trqbva

    cube.comments.push(newComment);//posle vkarvame komentara ma masiva ot komentari za tozi kube
    await cube.save()//nakraq spasqvame kuba s novite komentari
}

async function attachSticker(cubeId, stickerId) {
    const cube = await Cube.findById(cubeId);
    const sticker = await Accessory.findById(stickerId);

    if (!cube || !sticker) {
        throw new ReferenceError('No such ID in database!')
    }

    cube.accessories.push(sticker);
    return cube.save();

}


module.exports = {

    getAll,
    getById,
    create,
    edit,
    createComment,
    attachSticker
}