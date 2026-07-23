const connection = require('../db/connection');

//qui faccio le query al db

//GET all by sede
function findAllBySede(idSede, callback) {
    const query = `SELECT id, codice FROM badge WHERE sede = ?`;
    connection.query(query, [idSede], callback);
}

module.exports = { findAllBySede };