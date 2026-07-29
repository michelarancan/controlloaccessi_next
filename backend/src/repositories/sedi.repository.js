const connection = require('../db/connection');

//qui faccio le query al db

//GET all
function findAll(callback) {
    const query = `SELECT id, sede, ufficio FROM sedi WHERE is_active = true`;
    connection.query(query, callback);
}

//POST
function create(data, userId, callback) {
    const query = `INSERT INTO sedi(sede, ufficio, created_by) VALUES (?, ?, ?)`;
    connection.query(query, [data.sede, data.ufficio, userId], callback);
}

//PUT
function update(id, data, userId, callback) {
    const query = `UPDATE sedi SET sede = ?, ufficio = ?, updated_by = ? WHERE ID = ?`;
    connection.query(query, [data.sede, data.ufficio, userId, id], callback);
}

//DELETE
function remove(id, userId, callback) {
    const query = `UPDATE sedi SET is_active = false, updated_by = ? WHERE id = ?`;
    connection.query(query, [userId, id], callback);
}

//SEARCH
function search(campo, valore, callback) {
    const query = `SELECT id, sede, ufficio FROM sedi WHERE ${campo} LIKE ? AND is_active = true`;
    connection.query(query, [`%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };