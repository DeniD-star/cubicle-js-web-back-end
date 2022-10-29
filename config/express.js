const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');


module.exports = (app) => {
    app.engine('hbs', hbs({
        //tova e, izvikvame factory funkciqta hbs, na koqto podavame nastroika, da ima raz6irenie .hbs. tui kato po default e .handlebars(nie q promenqme na .hbs)
        extname: '.hbs'
    }))


    app.set('view engine', 'hbs'); //setvame view engine da tursi hbs raz6irenie koeto 6te ni pozvoli pri render da ne poqsnqvame raz6irenieto na faila
    app.use('/static', express.static('static'))//use kazva na na6eto prilojenie da izpolzva nqkakuv middleware i middlewara koito 6te izpolzvame e express.static, na koito podavame putq na vsi4ki stati4ni failove v na6eto prilojenie , koito 6te e 'static'
    app.use('/js', express.static('js'))//i ot static i ot js 6te se zarejdat stati4ni failove
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser());
    
    app.use(auth());
}

