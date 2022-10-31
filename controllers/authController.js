//santotiziation: kato dopulnenie na validaziqta, osven 4e dannite se proverqvat, v slu4ai 4e ne sa validni, tq pravi nqkavi promeni vurhu tqh za da gi napravi validni:
//-normalize email
//-trim
//-blacklist-premahvaneto na vsi4ki nevalidni simvoli(see sanitizers)
const router = require('express').Router();
//check proverqva vsi4ki: body, cookies, headers, params, query, nema smisul da proverqvam vsi4ki, zatova si izkarvame samo body, koeto idva ot formulqra;
const {body, validationResult} = require('express-validator');
const { isGuest, isAuth } = require('../middlewares/guards');
const {getUserByUsername} = require('../services/user');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
})

router.post('/register',
isGuest(), //validaciqta q pravim sled proverkata na guardovete

body('username', 'Username is required!')
.trim()
.isLength({min: 5}).withMessage('Username must be at least 5 characters long!')
.custom( async (value, {req})=>{//ako go imame zaku4eno v req, mojem da vzemem funkziqta i ot tuk(getUserByUsername)
    const user = await getUserByUsername(value);
    if(user){
        throw new Error('User already exists!')//zaduljitelno trqbva da trounem gre6ka ,koeto defacto e rejectvaneto 6tom imame async validator. Return false izpulnqva, full-filva promisa. trqbva da hvurlim gre6ka.
    }
    return true;
})
.isAlphanumeric().withMessage('Username must be only alphanumeric characters!'),
body('email', 'Please enter a valid email!').trim().isEmail().normalizeEmail(), 
body('password', 'Password is required!').trim().isLength({min: 8}).withMessage('Password must be at least 8 characters long!').isAlphanumeric().withMessage('Password must be only alphanumeric characters!'), 
body('repeatPassword', 'All fields are required!').trim().notEmpty().custom((value, {req})=>{
        if(value != req.body.password){
            throw new Error ('Passwords don`t match!')
        }

        return true;
}), 
async (req, res) => {//tova avtomati4no stava async function, tui kato, za6toto realno userServica vru6ta asynxronna finkziq i zatova imame try/catch, poneje po vreme na izvikvaneto i moje da izleze nqkakva gre6ka na survura, ina4e node.js 6te ni se kara ako nqmame try/catch
    try {
            const errors = Object.values(validationResult(req).mapped());
            if(errors.length > 0){
                throw new Error(errors.map(e=> e.msg).join('\n'))//da ni pokazva vsi4ki gre6ki navednuj
            }
     
        await req.auth.register(req.body);
        res.redirect('/products')
        console.log(req.body.email);
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