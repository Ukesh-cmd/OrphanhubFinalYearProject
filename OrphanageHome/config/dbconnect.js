require('dotenv').config();
const mysql = require("mysql");
const { dbHost, dbUser, dbDatabase, dbPassword } = process.env;

const pool = mysql.createPool({
    connectionLimit: 15,
    host: dbHost,
    database: dbDatabase,
    user: dbUser,
    password: dbPassword
});

const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};

const queryAsync = (connection, query, values) => {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


module.exports = {
    pool,
    getConnection,
    queryAsync
};