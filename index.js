//initialize express app
//setup handlebars
//setup static fails
//setup storage middleware
//set route handlers (controller actions)

const express = require('express');
const hbs = require('express-handlebars');

const { about } = require('./controllers/aboutController');
const { catalog } = require('./controllers/catalogController');
const { create, post } = require('./controllers/createController');
const { details } = require('./controllers/detailsController');
const { edit, postEdit } = require('./controllers/editController');
const { notFound } = require('./controllers/notFoundController');
const { init : storage} = require('./models/storage');

start();
async function start(){

const port = 3000;
const app = express();

app.engine('hbs', hbs({
    //tova e, izvikvame factory funkciqta hbs, na koqto podavame nastroika, da ima raz6irenie .hbs. tui kato po default e .handlebars(nie q promenqme na .hbs)
  extname: '.hbs'
}))

app.set('view engine', 'hbs'); //setvame view engine da tursi hbs raz6irenie koeto 6te ni pozvoli pri render da ne poqsnqvame raz6irenieto na faila
app.use('/static', express.static('static'))//use kazva na na6eto prilojenie da izpolzva nqkakuv middleware i middlewara koito 6te izpolzvame e express.static, na koito podavame putq na vsi4ki stati4ni failove v na6eto prilojenie , koito 6te e 'static'
app.use('/js', express.static('js'))//i ot static i ot js 6te se zarejdat stati4ni failove
app.use(await storage());
app.use(express.urlencoded({extended: false}))

app.get('/', catalog);
app.get('/about', about);
app.get('/details/:id',details);
app.get('/create', create);
app.post('/create', post);
app.get('/edit/:id', edit)
app.post('/edit/:id', postEdit)
app.all('*', notFound)

app.listen(port, ()=> console.log(`Listening on port ${port}.`))
}
