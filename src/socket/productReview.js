'use strict';

const {productReview} = require('../server');

productReview.on('connection',(socket)=>{
    console.log('the user is connected  on  product review servers :',socket.id)
})