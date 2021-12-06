'use strict';


const socket = io();

const notificationsOffers =io('/notificationsOffers');
const notificationsOrders = io('/notificationsOrders');
const productReview = io('/productReview');
const storeReview = io('/storeReview');

socket.on('connect',()=>{
    console.log(socket.id)
   
})

notificationsOffers.on('connect',()=>{
    // console.log('the notification offers is arrived ')
    notificationsOffers.on('offerNotification',(data)=>{
        console.log(data,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    })
})

notificationsOrders.on('connect',()=>{
    // console.log('the notification orders is arrived')
    notificationsOrders.on('orderNotifications',(data)=>{
        console.log(data,'the notification orders')
    })
})

productReview.on('connect',()=>{
    productReview.on('productReview',(data)=>{
        console.log(data,'the product review ')
    })
})

storeReview.on('connect',()=>{
    storeReview.on('storeReview',(data)=>{
        console.log(data,'the store review ')
    })
})
