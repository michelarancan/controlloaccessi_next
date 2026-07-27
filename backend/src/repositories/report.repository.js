const connection = require('../db/connection');

//qui faccio le query al db
 
//GET by data
function findAllByData(idSede, data, callback) {
    const query = `SELECT i.id, per.nome, per.cognome, i.badge AS idBadge, b.codice AS badge, i.targa, DATE_FORMAT(i.data_ingresso, '%H:%i:%s %d/%m/%Y') AS dataIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s %d/%m/%Y') AS dataUscita, DATE_FORMAT(i.data_ingresso, '%H:%i:%s') as oraIngresso, DATE_FORMAT(i.data_uscita, '%H:%i:%s') as oraUscita, i.categoria AS idCategoria, c.codice AS categoria, i.persona_riferimento AS idPersonaRiferimento, CONCAT(pr.cognome, ' ', pr.nome) AS personaRiferimento, pe.azienda AS idAzienda, a.ragione_sociale as azienda, i.divisione_destinazione AS idDivisione, d.nome as divisione 
    
    FROM ingressi_stabilimento i 
    JOIN badge b ON i.badge = b.id 
    JOIN categorie c ON i.categoria = c.id
    JOIN persone per ON i.persona = per.id 
    LEFT JOIN persone pr ON i.persona_riferimento = pr.id 
    LEFT JOIN persone_esterne pe ON i.persona = pe.persona 
    LEFT JOIN aziende a ON pe.azienda = a.id 
    JOIN divisioni d ON i.divisione_destinazione = d.id 

    WHERE d.sede = ? AND DATE(i.data_ingresso) = ? AND i.is_active = true ORDER BY i.data_ingresso DESC`;
    connection.query(query, [idSede, data.data], callback);
}

module.exports = { findAllByData };