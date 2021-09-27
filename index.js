'use strict';

require('dotenv').config();

const server =require('./src/server.js')

const client =require('./src/db');
/// start up with DB Server configuration





    client.connect()

    .then(() => {
       server.start(process.env.PORT)
    })
    .catch((e)=>{
       console.error('CONNECTION_ERROR',e);
    })


 

   

