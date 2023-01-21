
const {Client} = require('pg');

let client; 
process.env.dev ?  client = new Client({connectionString:process.env.DATABASE_URL}) : client = new Client( {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}
} );


module.exports =client;







