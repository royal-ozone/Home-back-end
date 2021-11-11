'use strict';

const {storeReview} = require('../server');

storeReview.on('connection',(socket)=>{
    console.log('the user is connected  on store review servers :',socket.id)
})