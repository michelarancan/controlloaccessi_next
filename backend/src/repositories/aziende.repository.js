const connection = require('../db/connection');

//qui faccio le query al db

//GET all
function findAll(callback) {
    const query = `SELECT id, ragione_sociale FROM aziende`;
    connection.query(query, callback);
}

module.exports = { findAll };