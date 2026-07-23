const connection = require('../db/connection');

//qui faccio le query al db

//GET all
function findAll(callback) {
    const query = `SELECT id, codice FROM categorie`;
    connection.query(query, callback);
}

module.exports = { findAll };