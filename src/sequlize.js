const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL)
sequelize.authenticate().then(()=> console.log('db connection established')).catch((err)=> console.log(err))

module.exports =  sequelize