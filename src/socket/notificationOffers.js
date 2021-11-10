'use strict';

const {notificationsOffers} = require('../server');

notificationsOffers.on('connection',(socket)=>{
    console.log('the users is connected on notification offers server',socket.id);
   
})