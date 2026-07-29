const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT id, nome, cognome FROM operatori WHERE sede = ? AND is_active = true ORDER BY cognome, nome`;
    connection.query(query, [idSede], callback);
}

//POST
function create(idSede, data, userId, callback) {
    const query = `INSERT INTO operatori(nome, cognome, sede, created_by) VALUES (?, ?, ?, ?)`;
    connection.query(query, [data.nome, data.cognome, idSede, userId], callback);
}

//PUT
function update(id, data, userId, callback) {
    const query = `UPDATE operatori SET nome = ?, cognome = ?, updated_by = ? WHERE id = ?`;
    connection.query(query, [data.nome, data.cognome, userId, id], callback);
}

//DELETE
function remove(id, userId, callback) {
    const query = `UPDATE operatori SET is_active = false, updated_by = ? WHERE id = ?`;
    connection.query(query, [userId, id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT id, nome, cognome FROM operatori WHERE sede = ? AND ${campo} LIKE ? AND is_active = true ORDER BY cognome, nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };