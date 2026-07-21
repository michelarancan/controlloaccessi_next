const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT p.id, p.nome, p.cognome, p.telefono, p.email, p.divisione, d.nome AS nomeDivisione, p.is_di_riferimento FROM persone_interne p JOIN divisioni d ON p.divisione = d.id WHERE p.is_active = true AND d.sede = ? ORDER BY p.cognome, p.nome`;
    connection.query(query, [idSede], callback);
}

//GET all di una divisione
function findAllByDivisione(idDivisione, callback) {
    const query = `SELECT p.id, p.nome, p.cognome, p.telefono, p.email, p.divisione, d.nome AS nomeDivisione, p.is_di_riferimento FROM persone_interne p JOIN divisioni d ON p.divisione = d.id WHERE p.is_active = true AND p.divisione = ? ORDER BY p.cognome, p.nome`;
    connection.query(query, [idDivisione], callback);
}

//GET by id
function findById(id, callback) {
    const query = `SELECT * FROM persone_interne WHERE id = ? AND is_active = true`;
    connection.query(query, [id], callback);
}

//POST
function create(data, callback) {
    const query = `INSERT INTO persone_interne(nome, cognome, telefono, email, divisione, is_di_riferimento) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, [data.nome, data.cognome, data.telefono, data.email, data.divisione, data.is_di_riferimento], callback);
}

//PUT
function update(id, data, callback) {
    const query = `UPDATE persone_interne SET nome = ?, cognome = ?, telefono = ?, email = ?, divisione = ?, is_di_riferimento = ? WHERE id = ?`;
    connection.query(query, [data.nome, data.cognome, data.telefono, data.email, data.divisione, data.is_di_riferimento, id], callback);
}

//DELETE
function remove(id, callback) {
    const query = `UPDATE persone_interne SET is_active = false WHERE id = ?`;
    connection.query(query, [id], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT p.id, p.nome, p.cognome, p.telefono, p.email, p.divisione, d.nome AS nomeDivisione, p.is_di_riferimento FROM persone_interne p JOIN divisioni d ON p.divisione = d.id WHERE d.sede = ? AND p.${campo} LIKE ? AND p.is_active = true ORDER BY p.cognome, p.nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

//SEARCH by divisione
function searchByDivisione(idDivisione, campo, valore, callback) {
    const query = `SELECT p.id, p.nome, p.cognome, p.telefono, p.email, p.divisione, d.nome AS nomeDivisione, p.is_di_riferimento FROM persone_interne p JOIN divisioni d ON p.divisione = d.id WHERE p.divisione = ? AND p.${campo} LIKE ? AND p.is_active = true ORDER BY p.cognome, p.nome`;
    connection.query(query, [idDivisione, `%${valore}%`], callback);
}

module.exports = { findAll, findAllByDivisione, findById, create, update, remove, search, searchByDivisione };