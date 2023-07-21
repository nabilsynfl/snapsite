const { Sequelize } = require("sequelize");

const db = new Sequelize('snapsite', 'root', '085251Zz/', {
    host: process.env.DB_HOST,
    dialect: "mysql"
})

db.authenticate()
    .then(() => {
        console.log("Berhasil Koneksi Ke Database");
    })
    .catch(err => {
        console.error('Gagal terhubung Ke Database', err)
    })

module.exports = db;


// const mysql = require('mysql2');

// const dbPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// module.exports = dbPool.promise();