const client = require("../../db");

const addProduct = async (data) => {
  try {
    let {
      store_id,
      entitle,
      artitle,
      metatitle,
      sku,
      price,
      brand_name,
      endescription,
      quantity,
      age,
      size_and_color,
      parent_category_id,
      child_category_id,
      grandchild_category_id,
      ardescription,
      discount,
      discount_rate,
    } = data;
    let SQL = `INSERT INTO product (store_id,entitle,artitle,metatitle,sku,price,brand_name,endescription,quantity, age, size_and_color,parent_category_id,child_category_id,grandchild_category_id,ardescription,discount,discount_rate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10, $11 ,$12,$13,$14,$15,$16,$17) RETURNING *;`;
    if (!entitle && artitle) {
      entitle = artitle;
    } else if (!artitle && entitle) {
      artitle = entitle;
    }
    let safeValues = [
      store_id,
      entitle,
      artitle,
      metatitle,
      sku,
      price,
      brand_name,
      endescription,
      quantity,
      age,
      size_and_color,
      parent_category_id,
      child_category_id,
      grandchild_category_id,
      ardescription,
      discount,
      discount_rate,
    ];
    let result = await client.query(SQL, safeValues);
    console.log("🚀 ~ file: products.js:50 ~ addProduct ~ result", result)
    return result.rows[0];
  } catch (error) {
    console.log("🚀 ~ file: products.js:53 ~ addProduct ~ error", error)
    throw new Error(error);
  }
};

const getAllProduct = async (data) => {
  try {
    let { key, limit = 20, offset = 0, display, status } = data;
    let safeValues = [limit, offset, display??true, status??"approved"];
    let _safeValues = [display??true, status??"approved"];
    delete data.limit;
    delete data.offset;
    delete data.display;
    delete data.status;
    delete data.duration
    const search = (params, array) => {
      let x = [];
      Object.keys(params).forEach((param, i) => {
        if (param === "key") {
          let w = [];
          new Set([key, ...key?.split(" ")])?.forEach((val) => {
            let i = array.push(`%${val.trim().toLowerCase()}%`);

            w.push(
              `(p.entitle like $${i} or p.artitle like $${i})`
            );
          });
          x.push(w.join(" or "));
        } else if (param === "price") {
          let i = array.push(params[param].split("-")[0]);
          let _i = array.push(params[param].split("-")[1]);

          x.push(`p.price between $${i} and $${_i}`);
        } else if (param === "store_id" || param === "brand_name") {
          let stores = params[param].split(",");
          let remain = stores
            .map((store) => {
              let i = array.push(store);
              return `$${i}`;
            })
            .join(",");
          let storeQuery = `p.store_id in (${remain})`;
          x.push(storeQuery);
        } else {
          let i = array.push(params[param]);
          x.push(`p.${param} = $${i}`);
        }
      });
      if (x.length) {
        return ` and ${x.join(" and ")}`;
      } else return "";
    };
    let baseQuery = `select p.*, s.store_name,pc.entitle as p_entitle, pc.artitle as p_artitle, cc.entitle as c_entitle, cc.artitle as c_artitle, gc.entitle as g_entitle, gc.artitle as g_artitle,  avg(pr.rate) as rate from product p inner join parent_category pc on p.parent_category_id = pc.id inner join child_category cc on p.child_category_id = cc.id left join grandchild_category gc on gc.id = p.grandchild_category_id inner join store s on p.store_id = s.id left join order_item oi on oi.product_id = p.id left join product_review pr on pr.order_item_id = oi.id where (p.display=$3) and (p.status=$4)`;
    let SQL = `${baseQuery} ${search(
      data,
      safeValues
    )} group by p.id,s.store_name,pc.entitle,pc.artitle,cc.entitle,cc.artitle,gc.entitle,gc.artitle limit $1 offset $2 `;
    let { rows } = await client.query(SQL, safeValues);
    let SQL2 = `select count(p.*) from product p inner join parent_category pc on p.parent_category_id = pc.id inner join child_category cc on p.child_category_id = cc.id left join grandchild_category gc on gc.id = p.grandchild_category_id inner join store s on p.store_id = s.id where (p.display=$1) and (p.status=$2) ${search(
      data,
      _safeValues
    )}  `;
    let _key = key?.toLowerCase()?.trim();
    rows.sort((a, b) => {
      if (
        (a.entitle.includes(_key) || a.artitle.includes(_key)) &&
        !(b.entitle.includes(_key) || b.artitle.includes(_key))
      ) {
        return -1;
      } else if (
        !(a.entitle.includes(_key) || a.artitle.includes(_key)) &&
        (b.entitle.includes(_key) || b.artitle.includes(_key))
      )
        return 1;
    });
    if (limit && offset) {
      let { rows: _rows } = await client.query(SQL2, _safeValues);

      return { data: rows, count: Number(_rows[0]?.count) ?? 0 };
    } else {
      return { data: rows };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProductsByCategories = async (data) => {
  try {
    let { P, C, G } = data;
    let SQL;
    let safeValues = [];
    if (G) {
      SQL =
        "SELECT * FROM product WHERE grandchild_category_id=$1 AND display=$2;";
      safeValues = [G, true];
    } else if (C) {
      SQL = "SELECT * FROM product WHERE child_category_id=$1 AND display=$2;";
      safeValues = [C, true];
    } else if (P) {
      SQL = "SELECT * FROM product WHERE parent_category_id=$1 AND display=$2;";
      safeValues = [P, true];
    } else {
      SQL = "SELECT * FROM product WHERE display=$1;";
      safeValues = [true];
    }
    let result = await client.query(SQL, safeValues);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProduct = async (data) => {
  try {
    let SQL = `select p.*, pc.entitle as p_entitle, pc.artitle as p_artitle, cc.entitle as c_entitle, cc.artitle as c_artitle, gc.entitle as g_entitle, gc.artitle as g_artitle, avg(pr.rate) as rate, count(pr.*) as votes  from product p inner join parent_category pc ON pc.id = p.parent_category_id inner join child_category cc on cc.id = p.child_category_id left join grandchild_category gc on gc.id = p.grandchild_category_id left join order_item oi on oi.product_id = p.id left join product_review pr on pr.order_item_id = oi.id WHERE p.id =$1 group by p.id,pc.entitle,pc.artitle,cc.entitle,cc.artitle,gc.entitle,gc.artitle ;`;
    let safeValue = [data];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProductByGrandChildIdModel = async (data, offset, limit) => {
  try {
    let SQL = `SELECT * FROM product WHERE grandchild_category_id =$1 AND display=$4 LIMIT $3 OFFSET $2;`;
    let result = await client.query(SQL, [data, offset, limit, true]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};
const getProductByChildIdModel = async (data, offset, limit) => {
  try {
    let SQL = `SELECT * FROM product WHERE child_category_id =$1 AND display=$2;`;
    let result = await client.query(SQL, [data, true]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreProducts = async (id, limit, offset) => {
  try {
    let SQL = `SELECT * FROM product WHERE store_id =$1 AND display=$4 LIMIT $2 OFFSET $3;`;
    let result = await client.query(SQL, [id, limit, offset, true]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStoreProductsByStatus = async (id, limit, offset, status) => {
  try {
    let SQL = `SELECT * FROM product WHERE store_id=$1 AND status=$4 AND display=$5 LIMIT $2 OFFSET $3;`;
    let SQL2 =
      "SELECT COUNT(*) FROM product WHERE store_id=$1 AND status=$2 AND display=$3;";
    let result = await client.query(SQL, [id, limit, offset, status, true]);
    let count = await client.query(SQL2, [id, status, true]);
    return { result: result.rows, ...count.rows[0] };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (data) => {
  try {
    let {
      id,
      entitle,
      artitle,
      metaTitle,
      sku,
      price,
      brand_name,
      endescription,
      age,
      ardescription,
      parent_category_id,
      child_category_id,
      grandchild_category_id,
    } = data;
    let SQL =
      "UPDATE product SET enTitle=$1, metaTitle=$2, sku=$3, price=$4, brand_name=$5, endescription=$6, arTitle=$7,age=$8,ardescription=$9, status=$10,parent_category_id=$12,child_category_id=$13,grandchild_category_id=$14 WHERE id=$11 RETURNING *;";
    let safeValues = [
      entitle,
      metaTitle,
      sku,
      price,
      brand_name,
      endescription,
      artitle,
      age,
      ardescription,
      "pending",
      id,
      parent_category_id,
      child_category_id,
      grandchild_category_id,
    ];
    let result = await client.query(SQL, safeValues);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSizeAndColorWithQuantity = async (data) => {
  try {
    let { quantity, size_and_color, id } = data;
    let SQL =
      "UPDATE product SET size_and_color=$1, quantity=$2 WHERE id=$3 RETURNING *;";
    let safeValue = [size_and_color, quantity, id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSizeAndQuantity = async (data) => {
  try {
    let { id, quantity, size, color } = data;
    let array = await getProduct(id).size_and_color;

    let newSizeAndColor = JSON.parse(array).map((val) => {
      if (val.size === size && color === val.color) {
        return { ...val, quantity: val.quantity - Number(quantity) };
      } else return val;
    });
    let SQL =
      "UPDATE product SET quantity=$2, size_and_color=$3 WHERE id=$1 RETURNING *;";
    let safeValue = [id, quantity, JSON.stringify(newSizeAndColor)];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSearchData = async (status1, status2 = null, id) => {
  try {
    let SQL =
      "SELECT id, entitle, artitle FROM product WHERE (status=$1 OR status=$2) AND store_id=$3 And display=$4;";
    let safeValue = [status1, status2, id, true];
    let result = await client.query(SQL, safeValue);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDiscount = async (data) => {
  try {
    let { id, discount, discount_rate } = data;
    let SQL =
      "UPDATE product SET discount =$2, discount_rate=$3 WHERE id=$1 RETURNING *;";
    let safeValue = [id, discount, discount_rate];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductStatus = async (data) => {
  try {
    let { id, status, rejection_reason } = data;
    let SQL = `UPDATE product SET status=$1, rejection_reason =$3 WHERE id=$2 RETURNING *;`;
    let safeValue = [status, id,rejection_reason];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    let SQL = `DELETE FROM product WHERE id=$1 RETURNING *;`;
    let safeValue = [id];
    let result = await client.query(SQL, safeValue);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductDisplay = async (id) => {
  try {
    let SQL = "UPDATE product SET display=$1 WHERE id=$2 RETURNING *;";
    let result = await client.query(SQL, [false, id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const decreaseSizeQuantity = async (data) => {
  try {
    const { id, size, color, quantity } = data;
    let product = await getProduct(id);
    if (size || color) {
      let arr = JSON.parse(product.size_and_color);
      let newSize = arr.map((val) => {
        if (val.size === size && val.color === color) {
          return { ...val, quantity: val.quantity - Number(quantity) };
        } else {
          return val;
        }
      });

      let newProduct = {
        ...product,
        quantity: newSize.reduce((p, c) => p + c.quantity, 0),
        size_and_color: JSON.stringify(newSize),
      };

      let result = await updateSizeAndColorWithQuantity(newProduct);
      return result;
    } else {
      let result = await updateSizeAndColorWithQuantity({
        ...product,
        quantity: Number(product.quantity) - Number(quantity),
      });
      return result;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const increaseSizeQuantity = async (data) => {
  try {
    const { id, size, color, quantity } = data;

    let product = await getProduct(id);
    if (size || color) {
      let newSize = JSON.parse(product.size_and_color).map((val) => {
        if (val.size === size && val.color === color) {
          return { ...val, quantity: val.quantity + Number(quantity) };
        } else if (val.size === size) {
          return { ...val, quantity: val.quantity + Number(quantity) };
        } else if (val.color === color) {
          return { ...val, quantity: val.quantity + Number(quantity) };
        }
        return val;
      });

      let newProduct = {
        ...product,
        quantity: newSize.reduce((p, c) => p + c.quantity, 0),
        size_and_color: JSON.stringify(newSize),
      };

      let result = await updateSizeAndColorWithQuantity(newProduct);
      return result;
    } else {
      let result = await updateSizeAndColorWithQuantity({
        ...product,
        quantity: product.quantity + Number(quantity),
      });
      return result;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const productSearch = async (data) => {
  try {
    let { key, limit = 20, offset = 0 } = data;
    let safeValues = [limit, offset, true, "approved"];
    let _safeValues = [true, "approved"];
    delete data.limit;
    delete data.offset;
    delete data.duration
    const search = (params, array) => {
      let x = [];
      Object.keys(params).forEach((param, i) => {
        if (param === "key") {
          let w = [];
          new Set([key, ...key?.split(" ")])?.forEach((val) => {
            let i = array.push(`%${val.trim().toLowerCase()}%`);

            w.push(
              `(p.entitle like $${i} or p.artitle like $${i} or p.endescription like $${i} or p.ardescription like $${i} or pc.entitle like $${i} or pc.artitle like $${i} or cc.entitle like $${i} or cc.artitle like $${i} or gc.entitle like $${i} or gc.artitle like $${i})`
            );
          });
          x.push(w.join(" or "));
        } else if (param === "price") {
          let i = array.push(params[param].split("-")[0]);
          let _i = array.push(params[param].split("-")[1]);

          x.push(`p.price between $${i} and $${_i}`);
        } else if (param === "store_id" || param === "brand_name") {
          let stores = params[param].split(",");
          let remain = stores
            .map((store) => {
              let i = array.push(store);
              return `$${i}`;
            })
            .join(",");
          let storeQuery = `p.store_id in (${remain})`;
          x.push(storeQuery);
        } else {
          let i = array.push(params[param]);
          x.push(`p.${param} = $${i}`);
        }
      });
      if (x.length) {
        return ` and ${x.join(" and ")}`;
      } else return "";
    };
    let baseQuery = `select p.*, s.store_name, avg(pr.rate) as rate from product p inner join parent_category pc on p.parent_category_id = pc.id inner join child_category cc on p.child_category_id = cc.id left join grandchild_category gc on gc.id = p.grandchild_category_id inner join store s on p.store_id = s.id left join order_item oi on oi.product_id = p.id left join product_review pr on pr.order_item_id = oi.id where (p.display=$3) and (p.status=$4)`;
    let SQL = `${baseQuery} ${search(
      data,
      safeValues
    )} group by p.id,s.store_name limit $1 offset $2 `;
    let { rows } = await client.query(SQL, safeValues);
    let SQL2 = `select count(p.*) from product p inner join parent_category pc on p.parent_category_id = pc.id inner join child_category cc on p.child_category_id = cc.id left join grandchild_category gc on gc.id = p.grandchild_category_id inner join store s on p.store_id = s.id where (p.display=$1) and (p.status=$2) ${search(
      data,
      _safeValues
    )}  `;
    let _key = key?.toLowerCase()?.trim();
    rows.sort((a, b) => {
      if (
        (a.entitle.includes(_key) || a.artitle.includes(_key)) &&
        !(b.entitle.includes(_key) || b.artitle.includes(_key))
      ) {
        return -1;
      } else if (
        !(a.entitle.includes(_key) || a.artitle.includes(_key)) &&
        (b.entitle.includes(_key) || b.artitle.includes(_key))
      )
        return 1;
    });
    if (limit && offset) {
      let { rows: _rows } = await client.query(SQL2, _safeValues);

      return { data: rows, count: Number(_rows[0]?.count) ?? 0 };
    } else {
      return { data: rows };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
  updateProductDisplay,
  getStoreProducts,
  decreaseSizeQuantity,
  increaseSizeQuantity,
  getStoreProductsByStatus,
  updateSizeAndQuantity,
  updateDiscount,
  getSearchData,
  getProductByGrandChildIdModel,
  getProductByChildIdModel,
  getProductsByCategories,
  productSearch,
  updateSizeAndColorWithQuantity,
};
