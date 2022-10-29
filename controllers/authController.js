const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' })
})
router.post('/register', async (req, res) => {//tova avtomati4no stava async function, tui kato, za6toto realno userServica vru6ta asynxronna finkziq i zatova imame try/catch, poneje po vreme na izvikvaneto i moje da izleze nqkakva gre6ka na survura, ina4e node.js 6te ni se kara ako nqmame try/catch
    try {
        await req.auth.register(req.body);
        res.redirect('/products')
    } catch (err) {
        const ctx = {
            title: 'Register',
            error: err.message,
            data: { username: req.body.username }
        }
        res.render('register', ctx)
    }

})
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' })
})
router.post('/login', async(req, res) => {
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

router.get('/logout', (req, res)=>{
    req.auth.logout();
    res.redirect('/products')
})

module.exports = router;