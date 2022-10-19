const { about } = require('../controllers/aboutController');
const { catalog } = require('../controllers/catalogController');
const { create, post } = require('../controllers/createController');
const { details } = require('../controllers/detailsController');
const { edit, postEdit } = require('../controllers/editController');
const { notFound } = require('../controllers/notFoundController');


module.exports = (app) => {
    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/create', create);
    app.post('/create', post);
    app.get('/edit/:id', edit)
    app.post('/edit/:id', postEdit)
    app.all('*', notFound)
}