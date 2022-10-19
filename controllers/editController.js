module.exports = {
    edit: async(req, res) => {
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
       
        
    },
    postEdit: async(req, res) => {

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
            res.redirect('404')
        }
        
    }
}