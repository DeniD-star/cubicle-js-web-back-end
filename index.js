//initialize express app
//setup handlebars
//setup static fails
//setup storage middleware
//set route handlers (controller actions)


const express = require('express');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

const { init : storage} = require('./services/storage');

start();
async function start(){

const port = 3000;
const app = express();

expressConfig(app);
app.use(await storage());//moddleware se zaka4a predi routovete
routesConfig(app);






app.listen(port, ()=> console.log(`Listening on port ${port}.`))
}
