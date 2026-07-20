const connection = require('../db/connection');

//qui faccio le query al db

//GET all
function findAll(callback) {
    const query = `SELECT id, sede, ufficio FROM sedi WHERE is_active = true`;
    connection.query(query, callback);
}

//POST
function create(data, callback) {
    const query = `INSERT INTO sedi(sede, ufficio) VALUES (?, ?)`;
    connection.query(query, [data.sede, data.ufficio], callback);
}

//PUT
function update(id, data, callback) {
    const query = `UPDATE sedi SET sede = ?, ufficio = ? WHERE ID = ?`;
    connection.query(query, [data.sede, data.ufficio, id], callback);
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE sedi SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(campo, valore, callback) {
    const query = `SELECT id, sede, ufficio FROM sedi WHERE ${campo} LIKE ? AND is_active = true`;
    connection.query(query, [`%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };