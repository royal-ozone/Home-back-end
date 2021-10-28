'use strict ';

/// dependencies ///

const client = require('./db'); 

const authRouter = require('./auth/routes')
const v1Router = require ('./api/router')
const v11Router = require ('./routes/v1')
const express = require('express');
require('dotenv').config();
const cors = require('cors');

/// server ///
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); ///
app.use(express.static('./public'));
app.use(cors());
app.use('/auth', authRouter);
app.use('/api/v1', v1Router);
app.use('/api/v1', v11Router);


/// routers /// 
const  HomePage = (req,res,next) =>{
    res.send('the server worked ')
    }
app.get('/' , HomePage);


// client.query('select * from company',(err,res)=>{
//     if(!err){
//         console.log(res.rows);

//     }else{
//         console.log('ahmad',err.message);
//     }
//     client.end();
// })  




/// exports /// 

module.exports = {

    server :app ,
    start : (port)=>{
        const PORT = port || 3000
        app.listen(port,()=>{
            console.log(`Server up on port ${port}`)
        });
    }
}