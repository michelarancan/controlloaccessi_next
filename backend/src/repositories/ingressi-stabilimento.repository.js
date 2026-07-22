const connection = require('../db/connection');

//qui faccio le query al db

//GET all di una sede
function findAll(idSede, callback) {
    const query = `SELECT i.id, i.nome, i.cognome, b.codice as badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') as dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, c.codice AS categoria, CONCAT(p.cognome, ' ', p.nome) AS personaRiferimento, a.ragione_sociale as azienda, d.nome as divisione FROM ingressi_stabilimento i JOIN badge b ON i.badge = b.id JOIN categorie c ON i.categoria = c.id JOIN persone_interne p ON i.persona_riferimento = p.id JOIN aziende a ON i.azienda = a.id JOIN divisioni d ON i.divisione_destinazione = d.id WHERE d.sede = ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede], callback);
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const query = `SELECT id, nome, cognome FROM operatori WHERE sede = ? AND ${campo} LIKE ? AND is_active = true ORDER BY cognome, nome`;
    connection.query(query, [idSede, `%${valore}%`], callback);
}

module.exports = { findAll, search };