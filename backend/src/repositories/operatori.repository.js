const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT id, nome, cognome FROM operatori WHERE sede = ? AND is_active = true ORDER BY cognome, nome`;
    connection.query(query, [idSede], callback);
}

//POST
function create(idSede, data, callback) {
    const query = `INSERT INTO operatori(nome, cognome, sede) VALUES (?, ?, ?)`;
    connection.query(query, [data.nome, data.cognome, idSede], callback);
}

//PUT
function update(id, data, callback) {
    const query = `UPDATE operatori SET nome = ?, cognome = ? WHERE id = ?`;
    connection.query(query, [data.nome, data.cognome, id], callback);
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE operatori SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT id, nome, cognome FROM operatori WHERE sede = ? AND ${campo} LIKE ? AND is_active = true ORDER BY cognome, nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, create, update, remove, search };