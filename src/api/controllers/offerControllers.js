'use strict';
const {addOfferModule,
    displayOfferModule,
    updateOfferModule,
    updateStatusOfferModule,
    getOfferByStoreIdModule,
    getAllOfferModule,
    getALLOfferStatusModule,
    getALLOfferDisplayModule,
    getOfferById,
    getStatusAcceptedOfferModule,
    getCityStoreModule,
}= require('../models/offer');

const {
    addOfferNotificationHandler,
}=require('../controllers/offerNotificationController');

const {
    getALLprofile,
}=require('../../auth/models/user');
const {getStoreFollowers}=require('../models/stores');

const addOfferHandler = async (req, res,next) => {
    try {
       let data =await  addOfferModule(req.body);
       res.status(200).json({message:'Successfully add offer ',data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const displayOfferHandler = async(req, res) => {
    try {
        let acceptedOffer = await getStatusAcceptedOfferModule(req.body);

        if(acceptedOffer.status  ==='accepted') {
            
            let data = await  displayOfferModule(req.body);
            let store = await getCityStoreModule(data.store_id);
            if(data.display === true){
                let allClient = await getALLprofile();
               // console.log("🚀 ~ file: offerControllers.js ~ line 40 ~ displayOfferHandler ~ allClient", allClient)

               // notification store 
                let storeFollower = await getStoreFollowers(data.store_id);
                let profiles=[];
                storeFollower.forEach((follower)=>{
                    profiles.push(follower.follower);
                });
                
                let filterNotificationStore=allClient.filter((item)=>{
                   return item.notification_store===true
                });

                console.log("🚀 ~ file: offerControllers.js ~ line 54 ~ displayOfferHandler ~ filterNotificationStore", filterNotificationStore)
                if(filterNotificationStore){
                    filterNotificationStore.forEach(async(client)=>{  

                        if(profiles.includes(client.id)){                          
                            await addOfferNotificationHandler({store_id:data.store_id,receiver_id:client.id,offer_id:data.id,message:'لحق العرض الرهيب هاد'});
                      }
                    
                  })
                }

                // all notifications 
                let filterNotificationALL= allClient.filter((client)=>{ 
                    return client.notification_all===true});

                console.log("🚀 ~ file: offerControllers.js ~ line 46 ~ displayOfferHandler ~ filterNotificationALL", filterNotificationALL)
                if(filterNotificationALL){

                    filterNotificationALL.map(async(client)=>{
                        await addOfferNotificationHandler({store_id:data.store_id,receiver_id:client.id,offer_id:data.id,message:'لحق العرض الرهيب هاد'});
                    })
                }

                // city notification 

                let filterNotificationCity=allClient.filter((item)=>{
                    return item.notification_city===true
                 });
                console.log("🚀 ~ file: offerControllers.js ~ line 78 ~ filterNotificationCity ~ filterNotificationCity", filterNotificationCity)
                 
                console.log("🚀 ~ file: offerControllers.js ~ line 89 ~ filterNotificationCity.forEach ~ store.city", store.city)
                 if(filterNotificationCity){
                    filterNotificationCity.forEach(async(client)=>{  
 
                         if(client.city===store.city){                          
                             console.log("🚀 ~ file: offerControllers.js ~ line 90 ~ filterNotificationCity.forEach ~ client.city", client.city)
                             await addOfferNotificationHandler({store_id:data.store_id,receiver_id:client.id,offer_id:data.id,message:'لحق العرض الرهيب هاد'});
                       }
                     
                   })
                 }
               
              res.status(200).json({message:'Successfully display offer update ',data:data});

            }
        }else{

             res.status(403).send('the offer is pending');
        }
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const updateOfferHandler =async(req, res) => {
    try {
        let oldData = await getOfferById(req.body.id);
        if(oldData.display === true){
            
            let data =await  updateOfferModule({...oldData,...req.body});
            res.status(200).json({message:'Successfully update offer  ',data:data});
        }
        res.status(403).send('the offer is not exist !! OR the display for offer is false ');
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const updateStatusOfferHandler =async(req, res) => {
    try {
        let data =await  updateStatusOfferModule(req.body);
        res.status(200).json({message:'Successfully update status  offer  ',data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const getOfferByStoreIdHandler =async(req, res) => {
    try {
        let data =await  getOfferByStoreIdModule(req.params.store_id);
        res.status(200).json({message:'Successfully get offer by store id  ',NumberOfOffers:data.length,data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const getAllOfferHandler =async(req, res) => {
    try {
        let data =await  getAllOfferModule();
        res.status(200).json({message:'Successfully get all offer ',NumberOfOffers:data.length,data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const getALLOfferStatusHandler =async(req, res) => {
    try {
        let data =await  getALLOfferStatusModule(req.body);
        res.status(200).json({message:'Successfully get all offer status ',NumberOfOffers:data.length,data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}
const getALLOfferDisplayHandler =async(req, res) => {
    try {
        let data =await  getALLOfferDisplayModule(req.body);
        res.status(200).json({message:'Successfully get all offer display ',NumberOfOffers:data.length,data:data});
    } catch (error) {
        res.status(403).send(error.message);
    }
}

module.exports ={
    addOfferHandler,
    displayOfferHandler,
    updateOfferHandler,
    updateStatusOfferHandler,
    getOfferByStoreIdHandler,
    getAllOfferHandler,
    getALLOfferStatusHandler,
    getALLOfferDisplayHandler
}