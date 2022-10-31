const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const { isGuest, isAuth } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
})
router.post('/register',
isGuest(), 
check('email', 'Please enter a valid email!').isEmail(), 
check('username', 'Username must be at least 3 characters long!').isLength({min: 3}),
async (req, res) => {//tova avtomati4no stava async function, tui kato, za6toto realno userServica vru6ta asynxronna finkziq i zatova imame try/catch, poneje po vreme na izvikvaneto i moje da izleze nqkakva gre6ka na survura, ina4e node.js 6te ni se kara ako nqmame try/catch
    try {
            const {errors} = validationResult(req);
            if(errors.length > 0){
                throw new Error(errors.map(e=> e.msg).join('\n'))//da ni pokazva vsi4ki gre6ki navednuj
            }
     
        // await req.auth.register(req.body);
        res.redirect('/products')
    } catch (err) {
        const ctx = {
            title: 'Register',
            errors: err.message.split('\n'),
            data: { username: req.body.username , email: req.body.email}
        }
        res.render('register', ctx)
    }

})
router.get('/login', isGuest(),(req, res) => {
    res.render('login', { title: 'Login Page' })
})
router.post('/login', isGuest(), async(req, res) => {
    try {
        await req.auth.login(req.body);
        res.redirect('/products')
    } catch (err) {
        const ctx = {
            title: 'Login',
            error: err.message,
            data: { username: req.body.username }
        }
        res.render('login', ctx)
    }
  
})

router.get('/logout', isAuth(), (req, res)=>{
    req.auth.logout();
    res.redirect('/products')
})

module.exports = router;