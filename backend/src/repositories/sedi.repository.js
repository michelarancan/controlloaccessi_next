const connection = require('../db/connection');

//qui faccio le query al db

//GET all
function findAll(callback) {
    const query = `SELECT id, sede, ufficio FROM sedi WHERE is_active = true`;
    connection.query(query, callback);
}

//GET by id
function findById(id, callback) {
    const query = `SELECT * FROM sedi WHERE id = ? && is_active = true`;
    connection.query(query, [id], callback);
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
    const query = `SELECT id, sede, ufficio FROM sedi WHERE ${campo} LIKE ?`;
    connection.query(query, [`%${valore}%`], callback);
}

module.exports = { findAll, findById, create, update, remove, search };