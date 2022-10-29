const {Router} = require('express');

const router = Router();

router.get('/', async(req, res)=>{
    //sled kato sme si napravili konfiguraciqta za stati4nite failove i za view engina da polzva hbs, sega imame dostup do metodite
    //res.send, res.sendFile, res.json, res.download, a su6to i res.render, koeto 6te ni vurne nqkakvo view
    const cubes = await req.storage.getAll(req.query);
    

    const ctx = {
        title: 'Cubicle', 
        cubes,
        search: req.query.search || '',
        from: req.query.from || '',
        to: req.query.to || ''
    }
    res.render('index', ctx);
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Cube Page' });
    //render idva ot express, toi e koito tursi view s raz6irenie hbs, koeto da renderira
    //vsi4ki view-ta trqbva da sa vuv views papkata, ina4e imeto na pakata moje da se promeni
});

router.post('/create',  async(req, res) => {

    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    }
   try {
    await req.storage.create(cube);
   } catch (err) {
      if(err.name == 'ValidationError'){
          return res.render('create', {title: 'Create Cube Page', error: 'All fields are required. Image url must be a valid Url!'})
      }
   }
    res.redirect('/');
});


router.get('/details/:id',  async(req, res)=>{

    const cube =  await req.storage.getById(req.params.id);
   

    if(cube == undefined){
        res.redirect('/404');

    }else{
        const ctx = {
            title: 'Details Page',
            cube
        }
        res.render('details', ctx);

    }
    
});

router.get('/edit/:id',  async(req, res) => {
    const cube =  await req.storage.getById(req.params.id);
    cube[`select${cube.difficultyLevel}`] = true;
    if(!cube){
        res.redirect('/404');

    }else{
        const ctx = {
            title: 'Edit Cube Page',
            cube
        }
        res.render('edit', ctx);

    }
   
    
});

router.post('/edit/:id', async(req, res) => {

    const cube = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    }

    try {
        await req.storage.edit(req.params.id, cube);
    res.redirect('/');
    } catch (err) {
        res.redirect('/\';]404')
    }
    
});


router.get('/attach/:cubeId',  async(req, res)=>{
    const cube =  await req.storage.getById(req.params.cubeId);
    const accessories = await req.storage.getAllAccessories((cube.accessories || []).map(a=> a._id));

    res.render('attach', {
        title: 'Attach Stickers',
        cube,
        accessories
    })
})

router.post('/attach/:cubeId', async(req, res)=>{
    const cubeId = req.params.cubeId;
    const stickerId = req.body.accessory;

    await req.storage.attachSticker(cubeId, stickerId);
    res.redirect(`/details/${cubeId}`)
})
module.exports = router;

