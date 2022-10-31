

const { commentPost } = require('../controllers/commentsController');
const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const {isAuth} = require('../middlewares/guards');



module.exports = (app) => {
    
    app.use('/products', productController);
    app.use('/accessory', accessoryController)
    app.use('/auth', authController)
    app.post('/comments/:cubeId/create', isAuth(), commentPost)

   app.use('/', homeController)

   app.use((err, req, res, next)=>{// tova e globalen error handling-gre6kite koito ne sa bili catchnati v kontroleritr ot middlewarite i sa bili podadeni s next, se hva6tat ot globalniq error handling
       console.log(err);
       res.status(500).send('Something happened!')
       //no tova e sa sinhronni funkcii,koeto malko obezmislq, tui kato vuv vsqko edno suvremenno prilojenie imame database, suotvetno 6te imame async operacii, pri koito async operazii,  survura 6te zaspi ako ne podadem next kato parametar, kudeto podavame gre6kata, za da bude hvanata gre6kata ot tozi globalen error handling
   })

}