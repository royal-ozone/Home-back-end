
const {Client} = require('pg');
//  const client = new Client({connectionString:process.env.DATABASE_URL}) ;
const client = new Client( {
    connectionString: process.env.DATABASE_URL,
    // ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}
  } );
  

module.exports =client;







