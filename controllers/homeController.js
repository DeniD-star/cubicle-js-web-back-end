const asyncWrapper = require('../util/asyncWrapper');

const router = require('express').Router();

router.get('/', (req, res)=> res.redirect('/products'));

  router.get('/about', asyncWrapper(async(req, res)=>{
    return next(new Error('Simulated error!'))//za da bude tazi gre6ka hvanata ot globalniq error handling v routes, vmesto da q hvurlqme q podavame na next parametura, koito 6te q pridviji natatuk, i ako ne e hvanata ot nikoi v kontrollerite 6te bude hvanata ot globalniq error handling
    res.render('about', {title: 'About Page'});
}))

router.all('*', (req, res)=>{
    res.render('404', {title: 'Page Not Found'});
    }
);

module.exports = router;