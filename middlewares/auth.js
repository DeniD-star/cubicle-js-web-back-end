const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { COOKIE_NAME, TOKEN_SECRET } = require('../config');

module.exports = () => (req, res, next) => {//poneje ima convenciq che middleware trqbva da e funkciq koqto vru6ta druga funkziq

    req.auth = {
        register,//suzdavaneto na user i na negoviq token se slu4va tuk v tozi middleware
        login,
        logout
    }
    if (readToken(req)) {
        next();
    }


    async function register({ username, password, repeatPassword }) {
        //validaciq
        //userDatata idva ot formulqra


        if (username == '' || password == '' || repeatPassword == '') {
            throw new Error('All fields are required!')
        } else if (password != repeatPassword) {
            throw new Error('Passwords don`t match!')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser(username, hashedPassword);//ako tuka vuznikne gre6ka, poneje sme go awaitnali, tazi gre6ka 6te se propageitne nagore i 6te stigne do kontrollera, koito e izvikal toq register
        req.user = createToken(user)//koeto ozna4ava 4e kato se registrirame 6te polu4im nov token
    }

    async function login({ username, password }) {// e async poneje trqbva da brukne v basata danni za da proveri ima li takuv potrebitel
        const user = await userService.getUserByUsername(username);
        if (!user) {
            throw new Error('Wrong username or password!')
        } else {

            const isMatch = await bcrypt.compare(password, user.hashedPassword);//gotova funkciq na bcrypt koqto proverqva dali podadenata parola matchva s tazi na potrebitelq v bazata
            if (!isMatch) {
                throw new Error('Wrong username or password!')
            } else {
                //informaciq za potrebitelq

                //i sega trqbva toq token da go izpratim na potrebitelq
                //i tui kato v express.js sme si nastroili na6eto prilojenie da polzva cookieparser(), imame vuzmojnost da setnem cookie

                req.user = createToken(user)//da zaka4i user profila za kontexta
            }

        }
    }

    async function logout(){
        res.clearCookie(COOKIE_NAME);
   
    }

    async function createToken(user) {//funkziq koqt 6te se izvikva 4esto, zatova q iznasqme, povtarqemi deistviq
        const userViewModel = { _id: user._id, username: user.username }
        const token = jwt.sign(userViewModel, TOKEN_SECRET);//suzdava se potrebitelska sesiq na potrebitelq
        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        return userViewModel;
    }

    async function readToken() {
        const token = req.cookies[COOKIE_NAME];
        if (token) {
            try {
                const userData = jwt.verify(token, TOKEN_SECRET);
                req.user = userData;
                res.locals.user = userData;//za da imame dostup v templeita do dannite na usera, locals e magi4eska promenliva v req i res, koqto moje da bude pro4etena ot handlebars, taka 4e da bude dostupna v templeita, po tozi na4in mojem da zaka4im usera
                console.log('Known user', userData.username);
                return true;
            } catch (err) {
                res.clearCookie(COOKIE_NAME);
                return false;
            }

        }
    }
}

