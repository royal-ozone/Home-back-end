'use strict';

// const { getUserByEmail,getUserByMobile } = require('../../auth/models/user')
const {createStore,getStore, updateStore,deleteStore,updateStoreName, getStoreByStatus, getStoreByName, getAllStores,updateStoreStatus,updateChangingName} = require('../models/stores');


// updateStoreRequestHandler,
// deleteStoreRequestHandler,


const createStoreHandler = async (req, res) =>{
    try {
      let result = await createStore( req.body)
                if (result) {
            res.status(200).json({
                status: 200,
                message: 'Store request created successfully',
            });
        }

        else {
            res.status(403).json({
                status: 403,
                message: 'Something went wrong while creating your store request!',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getStoreHandler = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await getStore(id);
        if (result) {
    res.status(200).json({
        status: 200,
        data: result,
    });
}

else {
    res.status(403).json({
        status: 403,
        message: 'There is no store with this profile_id',
    });
}
    } catch (error) {
        res.send(error.message)
    }
};


const updateStoreHandler = async (req, res) =>{
    try {
        let id = req.params.id; 
        let result = await updateStore(id, req.body)
        if (result) {
            res.status(200).json({
                status: 200,
                message: 'Store info has been updated successfully',
            });
        }
        
        else {
            res.status(403).json({
                status: 403,
                message: 'something went wrong while updating',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const updateStoreNameHandler = async (req, res) =>{   
    try {
        let id = req.params.id;
        let result = await getStore(id)
        if(result.name_is_changed){
            res.status(403).json({
                status: 403,
                message: 'Your store name has been changed previously',
            });
        } else {
            let result = await updateStoreName(id, req.body)
            await updateChangingName(id)
            res.status(200).json({
                status: 200,
                message: 'Store name has been changed successfully',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const deleteStoreHandler = async (req, res) =>{
    try {
        let id = req.params.id;
        let result = await deleteStore(id);
        if (result) {
            res.status(200).json({
                status: 200,
                message: 'Store info has been deleted successfully',
            });
        }
        
        else {
            res.status(403).json({
                status: 403,
                message: 'something went wrong while deleting',
            });
        }
    } catch (error) {
        res.send(error.message)
    }
};

const getAllStoresHandler = async (req, res) =>{
    try {
        let response = await getAllStores();
        res.status(200).json({
            status: 200,
            data: response,
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

const getStoreByStatusHandler = async (req, res) => {
    try {
        let status = req.params.status;
        let response = await getStoreByStatus(status);
        res.status(200).json({
            status: 200,
            data: response,
        })

    } catch (error) {
        res.status(403).send(error.message)
    }
}
const getStoreByNameHandler = async (req, res) => {
    try {
        let status = req.params.name;
        let response = await getStoreByName(status);
        res.status(200).json({
            status: 200,
            data: response,
        })

    } catch (error) {
        res.status(403).send(error.message)
    }
}

const updateStoreStatusHandler = async (req, res) => {
    try {
        let id = req.params.id;
        let response = await updateStoreStatus(id, req.body)
        res.status(200).json({
            status: 200,
            message: 'Store Status has been updated successfully'
        })
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = {createStoreHandler, getStoreHandler, deleteStoreHandler, updateStoreHandler, updateStoreNameHandler,getAllStoresHandler,getStoreByStatusHandler,updateStoreStatusHandler,getStoreByNameHandler}



// const createStoreRequestHandler = async (req, res, next) => {

//     try {

//         let { store_name, city, address, mobile, caption, about } = req.body;
//         let profile = await getProfileByUserId(req.user.id);
//         let profile_id = profile.id;

//         let store = await requestStore(req.body, profile_id);

//         if (store) {
//             res.status(200).json({
//                 status: 200,
//                 message: 'Store request created successfully',
//             });
//         }

//         else {
//             res.status(403).json({
//                 status: 403,
//                 message: 'Something went wrong while creating your store request!',
//             });
//         }

//     } catch (error) {
//         res.send(error.message)
//     }

// };

// const createStoreHandler = async (req, res, next) => {

//     try {

//         let {profile_id} = req.body;

//         let store = await createStore(profile_id);

//         if (store !== 0) {
//             res.status(200).json({
//                 status: 200,
//                 message: 'Store created successfully',
//             });
//         }

//         else {
//             res.status(403).json({
//                 status: 403,
//                 message: 'Something went wrong while creating the user/s store!',
//             });
//         }

//     } catch (error) {
//         res.send(error.message)
//     }

// };

// const updateStoreHandler = async (req, res, next) => {

//     try {

//         let { store_name, city, address, mobile, caption, about } = req.body;
//         let profile = await getProfileByUserId(req.user.id);
//         let profile_id = profile.id;

//         let store = await updateStore(req.body, profile_id);

//         if (store) {
//             res.status(200).json({
//                 status: 200,
//                 message: 'Store edited successfully',
//             });
//         }

//         else {
//             res.status(403).json({
//                 status: 403,
//                 message: 'Something went wrong while editing your store!',
//             });
//         }

//     } catch (error) {
//         res.send(error.message)
//     }

// };

// const deleteStoreHandler = async (req, res, next) => {

//     try {

//         let store = await deleteStore(req.params.storeId);
//         if (!store) {
//             res.status(200).json({
//                 status: 200,
//                 message: 'Store deleted successfully',
//             });
//         }

//         else {
//             res.status(403).json({
//                 status: 403,
//                 message: 'Something went wrong while deleting your store!',
//             });
//         }

//     } catch (error) {
//         res.send(error.message)
//     }

// };

// module.exports = {
//     createStoreRequestHandler,
//     // updateStoreRequestHandler,
//     // deleteStoreRequestHandler,
//     createStoreHandler,
//     updateStoreHandler,
//     deleteStoreHandler
// };