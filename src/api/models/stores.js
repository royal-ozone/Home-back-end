"use strict";
const client = require("../../db");
const { deleteRemoteFile } = require("../middleware/uploader");
const { daysToMs } = require("../controllers/helper");
// store handlers ---------------------------------------------------------------------------------------------------

const createStore = async (data) => {
  try {
    let {
      profile_id,
      store_name,
      city,
      caption,
      about,
      store_picture,
      mobile,
      verified_email,
      verification_code,
    } = data;
    let SQL =
      "INSERT INTO STORE (profile_id, store_name, city,caption, about,store_picture,mobile,verified_email,verification_code) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;";
    let safeValues = [
      profile_id,
      store_name,
      city,
      caption,
      about,
      store_picture,
      mobile,
      verified_email,
      verification_code,
    ];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateVerificationCode = async (data) => {
  try {
    let { id, code } = data;
    let SQL = `UPDATE store SET verification_code=$2 WHERE id=$1 RETURNING *;`;
    let safeValues = [id, code];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateVerifiedEmail = async (data) => {
  try {
    let { id, verified_email } = data;
    let SQL = "UPDATE store SET verified_email =$2 WHERE id=$1 RETURNING *;";
    let safeValues = [id, verified_email];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStore = async (id) => {
  try {
    let SQL = "DELETE FROM STORE WHERE profile_id=$1 RETURNING *;";
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStore = async (id, data) => {
  try {
    let { city, caption, about, mobile, verified_email } = data;
    let SQL =
      "UPDATE STORE SET city=$1,caption=$2,about=$3, mobile=$5,verified_email=$6  WHERE profile_id=$4 or id=$4 RETURNING *;";
    let safeValues = [city, caption, about, id, mobile,verified_email];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStoreName = async (id, data) => {
  try {
    let { store_name } = data;
    let SQL = "UPDATE STORE SET store_name=$1, name_is_changed=$3 WHERE profile_id=$2 or id=$2 RETURNING *;";
    let safeValues = [store_name, id, true];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStore = async (id) => {
  try {
    let SQL =
      "SELECT s.*, sr.fulfilled_orders, sr.ontime_orders, sr.overall_orders, count(sf.*) as followers  FROM STORE s left join store_review_2 sr on s.id = sr.store_id left join store_follower sf on s.id=sf.store_id  WHERE s.id=$1 or s.profile_id=$1 group by sr.fulfilled_orders, s.id,sr.ontime_orders,sr.overall_orders ;";
    let safeValues = [id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStoreStatus = async (data) => {
  try {
    let { status, rejected_reason, id } = data;
    let SQL =
      "UPDATE STORE SET status=$1, rejected_reason=$2 WHERE id=$3 RETURNING *;";
    let safeValues = [status, rejected_reason, id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreByStatus = async (data) => {
  try {
    let { limit = 10, offset = 0, status } = data;
    let SQL = "SELECT * FROM STORE WHERE status=$3 offset $2 limit $1;";
    let SQL2 = "SELECT count(*) FROM STORE WHERE status=$1";
    let safeValues = [limit, offset, status];
    let result = await client.query(SQL, safeValues);
    let { rows: _rows } = await client.query(SQL2, [status]);
    return { data: result.rows, count: Number(_rows[0].count) ?? 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreByName = async (data) => {
  try {
    let SQL = "SELECT * FROM STORE WHERE store_name=$1;";
    let safeValues = [data];
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllStores = async (data) => {
  try {
    let { limit, offset } = data;
    let safeValues = [limit, offset, "pending"];
    let _safeValues = ["pending"];
    delete data.limit;
    delete data.offset;
    const search = (params, array) => {
      let x = [];
      Object.keys(params).forEach((param) => {
        if (param === "query") {
          let i = array.push(`%${params[param].trim().toLowerCase()}%`);
          x.push(
            `(lower(c.email) like $${i} or s.mobile like $${i} or lower(s.store_name) like $${i})`
          );
        } else if (["performance_rate", "sales_rate"].includes(param)) {
          let i = array.push(params[param].split("-")[0]);
          let _i = array.push(params[param].split("-")[1]);
          x.push(`${param} between $${i} and $${_i}`);
        } else if( ['status','verified_email'].includes(param)) {
             let i = array.push(params[param]);
             x.push(`s.${param} = $${i}`)
        }
      });
      if (x.length) {
        return ` and ${x.join(" and ")}`;
      } else return "";
    };
    let SQL = `SELECT s.* FROM STORE s inner join profile p on p.id=s.profile_id inner join client c on c.id=p.user_id where s.status != $3 ${search(
      data,
      safeValues
    )}  limit $1 offset $2;`;
    let SQL2 = `SELECT count(s.*) FROM STORE s inner join profile p on p.id=s.profile_id inner join client c on c.id=p.user_id where s.status != $1 ${search(
      data,
      _safeValues
    )};`;
    let { rows } = await client.query(SQL, safeValues);
    if (limit && offset) {
      let { rows: rows2 } = await client.query(SQL2, _safeValues);
      return { data: rows, count: Number(rows2[0]?.count) ?? 0 };
    } else {
      return { data: rows };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateChangingName = async (id) => {
  try {
    let SQL = "UPDATE STORE SET name_is_changed=$1 WHERE profile_id=$2 or id=$2;";
    let safeValues = [true, id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// store reviews ---------------------------------------------------------------------------------------------------

const checkIfReviewed = async (profileId, storeId) => {
  try {
    let SQL = `SELECT * FROM STORE_REVIEW WHERE profile_id=$1 AND store_id=$2;`;
    let safeValues = [profileId, storeId];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createStoreReview = async (profile_id, data) => {
  try {
    let { store_id, review, rate } = data;
    let check = await checkIfReviewed(profile_id, store_id);
    if (check) {
      return 0;
    }
    let SQL = `INSERT INTO STORE_REVIEW (profile_id,store_id,review,rate) VALUES ($1,$2,$3,$4) RETURNING *;`;
    let safeValues = [profile_id, store_id, review, rate];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const addStoreReviewModel2 = async (store_id) => {
  try {
    let SQL = "INSERT INTO STORE_REVIEW_2 (store_id) VALUES ($1) RETURNING *;";
    let safeValues = [store_id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateStoreReview2 = async (store_id, data) => {
  try {
    let { fulfilled_orders, ontime_orders, overall_orders, last_update } = data;
    let SQL =
      "UPDATE STORE_REVIEW_2 SET fulfilled_orders =$1,ontime_orders=$2 ,overall_orders=$3 ,last_update=$5 WHERE store_id=$4 RETURNING *;";
    let safeValues = [
      fulfilled_orders,
      ontime_orders,
      overall_orders,
      store_id,
      last_update,
    ];
    let result;
    result = await client.query(SQL, safeValues);
    if (!result.rows[0]) {
      result = await addStoreReviewModel2(store_id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getStoreReview2ByStoreId = async (store_id) => {
  try {
    let SQL = "SELECT * FROM store_review_2 WHERE store_id =$1;";
    let safeValues = [store_id];
    let result;
    result = await client.query(SQL, safeValues);
    if (!result.rows[0]) {
      result = await addStoreReviewModel2(store_id);
    }
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllStoreReview2 = async () => {
  try {
    let SQL = "SELECT * FROM store_review_2 ;";
    let result = await client.query(SQL);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllStoreReviews = async () => {
  try {
    let SQL = `SELECT * FROM STORE_REVIEW;`;
    let result = await client.query(SQL);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreReviews = async (storeId) => {
  try {
    let SQL = `SELECT * FROM STORE_REVIEW WHERE store_id=$1;`;
    let safeValues = [storeId];
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStoreReview = async (profile_id, store_id, data) => {
  try {
    let { review, rate } = data;

    let SQL =
      "UPDATE STORE_REVIEW SET review=$1,rate=$2,fulfillment_rate, WHERE store_id=$3 AND profile_id=$4 RETURNING *;";
    let safeValues = [review, rate, store_id, profile_id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStoreReview = async (data) => {
  try {
    let { profile_id, store_id } = data;
    let check = await checkIfReviewed(profile_id, store_id);
    if (!check) {
      return 0;
    }
    let SQL = "DELETE FROM STORE_REVIEW WHERE store_id=$1 AND profile_id=$2;";
    let safeValues = [store_id, profile_id];
    let result = await client.query(SQL, safeValues);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
// store reviews ---------------------------------------------------------------------------------------------------

const checkIfFollowed = async (profileId, storeId) => {
  try {
    let SQL = `SELECT * FROM STORE_FOLLOWER WHERE follower=$1 AND store_id=$2;`;
    let safeValues = [profileId, storeId];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllStoreFollowers = async () => {
  try {
    let SQL = `SELECT * FROM STORE_FOLLOWER;`;
    let result = await client.query(SQL);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreFollowers = async (storeId) => {
  try {
    let SQL = `SELECT * FROM STORE_FOLLOWER WHERE store_id=$1;`;
    let safeValues = [storeId];
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createStoreFollower = async (profileId, storeId) => {
  try {
    let SQL = `INSERT INTO STORE_FOLLOWER(follower,store_id) VALUES ($1,$2) RETURNING *;`;
    let safeValues = [profileId, storeId];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
    // let check = await checkIfFollowed(profileId, storeId);
    // if (check) {
    //     let response = {
    //         number:0,
    //         data:check
    //     }
    //     // let deleteFollower = await deleteStoreFollower(profileId, storeId);
    //     return response;
    // }
    // else {
    // }
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStoreFollower = async (profileId, storeId) => {
  try {
    // let check = await checkIfFollowed(profileId, storeId);
    let SQL =
      "DELETE FROM store_follower WHERE store_id=$1 AND follower=$2 RETURNING * ;";
    let safeValues = [storeId, profileId];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFollowedStores = async (id) => {
  try {
    let SQL = "select store_id from store_follower where follower=$1;";
    let result = await client.query(SQL, [id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStorePicture = async (id, data) => {
  try {
    let SQL = "UPDATE STORE SET store_picture=$1 where id=$2 RETURNING *;";
    let safeValues = [data, id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteStorePicture = async (id) => {
  try {
    let result = await getStore(id);
    await deleteRemoteFile(result.store_picture);
    let SQL = "UPDATE STORE SET store_picture=$1 where id=$2 RETURNING *;";
    let safeValues = [process.env.DEFAULT_STORE_PICTURE, id];
    let result2 = await client.query(SQL, safeValues);
    return result2.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const createNumberOfStoreFollower = async (store_id) => {
  try {
    let SQL =
      "INSERT INTO store_follower_number(store_id) VALUES ($1) RETURNING *;";
    let safeValues = [store_id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getNumberOfFollower = async (id) => {
  try {
    let SQL = "SELECT * FROM store_follower_number WHERE store_id =$1 ;";
    let result = await client.query(SQL, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getALLNumbersOFFollowers = async () => {
  try {
    let SQL = "SELECT * FROM store_follower_number;";
    let result = await client.query(SQL);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateNumberOfFollowersMinus = async (store_id) => {
  try {
    let data = await getNumberOfFollower(store_id);
    data.number_of_follower--;
    let SQL =
      "UPDATE store_follower_number SET number_of_follower=$1 WHERE store_id=$2  RETURNING *;";
    let safeValues = [data.number_of_follower, store_id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateNumberOfFollowersPlus = async (store_id) => {
  try {
    let data = await getNumberOfFollower(store_id);
    data.number_of_follower++;
    let SQL =
      "UPDATE store_follower_number SET number_of_follower=$1 WHERE store_id=$2  RETURNING *;";
    let safeValues = [data.number_of_follower, store_id];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getALLStoreByProfileId = async (profile_id) => {
  try {
    let SQL = "SELECT * FROM store_follower WHERE follower=$1;";
    let result = await client.query(SQL, [profile_id]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStoreRates = async ({ id, performanceRate, salesRate, store_rating }) => {
  try {
    let SQL =
      "UPDATE store set performance_rate =$1, sales_rate =$2, store_rating=$4  WHERE id =$3 returning *";
    let safeValues = [performanceRate, salesRate, id,Number(store_rating).toFixed(2)];
    let { rows } = await client.query(SQL, safeValues);
    return rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateStoresRates = async () => {
  let SQL = `select * from store`;
  let { rows: stores } = await client.query(SQL);
  stores.forEach(async (store) => {
    let SQL = "select * from store_review_2 where store_id =$1";
    let { rows } = await client.query(SQL, [store.id]);
    let { fulfilled_orders, ontime_orders, overall_orders } = rows[0];
    let performanceRate = overall_orders
    ? (
      ((overall_orders - (fulfilled_orders - ontime_orders)) /
      overall_orders) *
      100
      ).toFixed(2)
      : 0;
      let SQL2 =
      "select avg(pr.rate) from product_review pr inner join order_item oi on pr.order_item_id= oi.id where oi.store_id = $1";
    let { rows: _rows } = await client.query(SQL2, [store.id]);
    let salesRate = Number(_rows[0].avg).toFixed(2) ?? 0;
    const storeRating = Number(salesRate) > 0? (((Number(performanceRate)/20)+ Number(salesRate))/2).toFixed(2): (Number(performanceRate)/20).toFixed(2)
    await updateStoreRates({
      id: store.id,
      performanceRate: performanceRate,
      salesRate: salesRate,
      store_rating: storeRating
    });
  });
};

const getStoresCount = async ({status}) =>{
  try {
    let safeValues = [status??'approved']
    const SQL = `select count(*) from store where status = $1`
    const _SQL = `select store_name,id, store_rating, store_picture from store order by store_rating desc limit 3`

    const {rows} = await client.query(SQL, safeValues)
    const {rows: _rows} = await client.query(_SQL)
    
    return {count:Number(rows[0].count) ?? 0, ratedStores: _rows}
  } catch (error) {
    throw new Error(error.message);
  }
}

setInterval(updateStoresRates, daysToMs(1 / 24));

module.exports = {
  createStore,
  getStore,
  updateStore,
  deleteStore,
  updateStoreName,
  updateStoreStatus,
  getStoreByStatus,
  getStoreByName,
  getAllStores,
  updateChangingName,
  createStoreReview,
  getAllStoreReviews,
  getStoreReviews,
  updateStoreReview,
  deleteStoreReview,
  createStoreFollower,
  getAllStoreFollowers,
  getStoreFollowers,
  deleteStoreFollower,
  updateStorePicture,
  deleteStorePicture,
  checkIfFollowed,
  checkIfReviewed,
  updateNumberOfFollowersPlus,
  updateNumberOfFollowersMinus,
  createNumberOfStoreFollower,
  getNumberOfFollower,
  getALLNumbersOFFollowers,
  getALLStoreByProfileId,
  addStoreReviewModel2,
  updateStoreReview2,
  getStoreReview2ByStoreId,
  getAllStoreReview2,
  updateVerificationCode,
  updateVerifiedEmail,
  getFollowedStores,
  getStoresCount
};
