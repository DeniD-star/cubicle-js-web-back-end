const mongoose = require('mongoose');

module.exports = (app) =>{
    return new Promise((resolve, reject)=> {
        mongoose.connect('mongodb://localhost:27017/cubicleTwo', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
         //useCreatedIndex is no longer supported
        })

        const db = mongoose.connection;

        db.on('error', err=>{
            console.error('Database error: ', err.message);
            reject(err.message)
        });

        db.on('open', ()=>{
            console.log('Database connected!');
            resolve();
        })
    })
   

}