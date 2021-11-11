'use strict ';

/// dependencies ///

const client = require('./db'); 

const authRouter = require('./auth/routes')
const v1Router = require ('./routes/v1')
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http');
const multer = require('multer');
let upload = multer()
const events =require('./socket/event')

const server = http.createServer(app);
const socket =require('socket.io');
const io =  socket(server ,{
   
    cors: {
        origin: { origin: '*' },
        methods: ['GET', 'POST'],
      },
});
//   io.listen(server)
/// server ///

app.use(cors());
app.use(upload.none())
app.use(express.json()); ///
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../public')));

app.use('/auth', authRouter);
app.use('/api/v1', v1Router);

/// routers /// 
// const  HomePage = (req,res,next) =>{
//     res.send('the server worked ')
//     }
// app.get('/' , HomePage);


// namespace socket  //////////////////////////////////
let notificationsOffers = io.of('/notificationsOffers');
let notificationsOrders = io.of('/notificationsOrders');
let productReview = io.of('/productReview');
let storeReview = io.of('/storeReview');


notificationsOffers.on('connection',() => {
    require('./socket/notificationOffers');
});
notificationsOrders.on('connection',()=>{
    require('./socket/notificationOrders');  
});
productReview.on('connection',()=>{
    require('./socket/productReview');
});
storeReview.on('connection',()=>{
    require('./socket/storeReview');
})


events.on('offerNotification',(data)=>{
    console.log('offerNotification add : : :',data)
    notificationsOffers.emit('offerNotification',data)
})

events.on('orderNotifications',(data)=>{
    console.log('orderNotifications add : ::  ',data);
    notificationsOrders.in(data.receiver_id).emit('orderNotifications')
})
events.on('productReview',(data)=>{
    console.log('productReview add : :: ',data);
    productReview.emit('productReview',data);
});
events.on('storeReview',(data)=>{
    console.log('storeReview add',data);
    storeReview.emit('storeReview',data);
});
// io.on('connection', (socket)=>{
//     console.log('a user connected on localhost  ')
// })


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
        server.listen(port,()=>{
            console.log(`Server up on port ${port}`)
        });
    },
    notificationsOffers,
    notificationsOrders,
    storeReview,
    productReview

}