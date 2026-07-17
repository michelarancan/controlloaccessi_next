const mysql = require('mysql2');

//parametri per la connessione
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'controlloaccessi_next'
});

module.exports = connection;