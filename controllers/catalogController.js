//controllera e celiq fail catalogController, a actions sa otdelnite funkzii vutre v nego

module.exports={
    catalog: async(req, res)=>{
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
    }
}