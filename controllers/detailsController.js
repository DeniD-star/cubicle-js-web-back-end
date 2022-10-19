module.exports={
    details: async(req, res)=>{

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
        
    }
}