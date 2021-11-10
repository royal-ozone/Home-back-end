'use strict';

const {notificationsOrders} = require('../server');

notificationsOrders.on('connection',(socket)=>{
    console.log('the user is connected  on notification orders servers :',socket.id)
})