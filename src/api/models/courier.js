const client = require("../../db");

const createCourier = async data => {
    try {
        let {profile_id, company_id} = data;
        let SQL = 'INSERT INTO courier (profile_id, company_id) VALUES ($1,$2) RETURNING *;';
        let safeValue = [profile_id, company_id];
        let result = await client.query(SQL, safeValue);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateCourierStatus = async (id,data) => {
    try {
        let {status} = data;
        let SQL = 'UPDATE courier SET status=$1 WHERE id=$2 RETURNING *;';
        let safeValues = [status, id];
        let result = await client.query(SQL, safeValues);
        return result.rows[0]
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteCourier = async (id) => {
    try {
        let SQL = 'DELETE FROM courier WHERE id=$1 OR profile_id=$1 RETURNING *;'
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
};

const getAllCouriers = async () => {
    try {
        let SQL = 'SELECT * FROM courier;';
        let result = await client.query(SQL);
        return result.rows
    } catch (error) {
        throw new Error(error.message)
    }
}

const getCourierById = async (id) =>{
    try {
        let SQL = 'SELECT c.*, p.first_name, p.last_name FROM courier c inner join profile p on p.id = c.profile_id WHERE c.id=$1 OR c.profile_id=$1;';
        let result = await client.query(SQL, [id]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error.message)
    }
}

const removeCourierByCompany = async id => {
    try {
        let SQL = 'update courier set company_id = null where id=$1 returning *'
        let {rows} = await client.query(SQL,[id])
        return rows[0]
    } catch (error) {
        console.log("🚀 ~ file: courier.js ~ line 63 ~ removeCourierByCompany ~ error", error)
        throw new Error(error)
    }
}

const getCouriersByCompanyId = async ({id,offset, limit}) =>{
    try {
        let SQL = 'SELECT c.*, p.first_name, p.last_name FROM courier c inner join profile p on p.id = c.profile_id WHERE Company_id=$1 limit $2 offset $3;';
        let SQL2 = 'SELECT count(*) FROM courier WHERE Company_id=$1;';
        let result = await client.query(SQL, [id,limit, offset]);
        let {rows} = await client.query(SQL2, [id])
        return {data: result.rows, count:Number(rows[0].count)};
    } catch (error) {
        throw new Error(error)
    }
}

const resetCourier =async  ({company_id, id}) => {
    try {
        
        let SQL = 'update courier set company_id = $1, status = $2 where id = $3 RETURNING *;'
        let safeValues = [company_id, 'pending', id]
        let { rows} = await client.query(SQL, safeValues)
        return rows[0]
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {createCourier, updateCourierStatus, deleteCourier,getAllCouriers, getCourierById,getCouriersByCompanyId,removeCourierByCompany,resetCourier}