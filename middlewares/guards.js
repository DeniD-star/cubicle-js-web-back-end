function isAuth(){
    return (req, res, next)=>{
        if(req.user != undefined){
            next()
        }else{
            res.redirect('/auth/login')
        }
    }
}
function isGuest(){
    return (req, res, next)=>{
        if(req.user == undefined){
            next()
        }else{
            res.redirect('/products')
        }
    }
}
function isOwner(){
    return (req, res, next)=>{

        if(req.data.cube && req.user && (req.data.cube.creatorId == req.user._id)){//trqbva da proverim purvo dali kuba go ima , a su6to i usera i 4ak togava da proverqvame dali suvpadata creatora s usera
            next()
        }else{
            res.redirect('/auth/login')
        }
      
    }
}

module.exports = {
    isAuth, 
    isGuest,
    isOwner
}