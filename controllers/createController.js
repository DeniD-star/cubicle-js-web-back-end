module.exports = {
    create: (req, res) => {
        res.render('create', { title: 'Create Cube Page' });
        //render idva ot express, toi e koito tursi view s raz6irenie hbs, koeto da renderira
        //vsi4ki view-ta trqbva da sa vuv views papkata, ina4e imeto na pakata moje da se promeni
    },
    post: async(req, res) => {

        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: Number(req.body.difficultyLevel)
        }
        await req.storage.create(cube);
        res.redirect('/');
    }
}