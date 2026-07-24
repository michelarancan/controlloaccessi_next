const repository = require('../repositories/ingressi-stabilimento.repository');
const divisioneRepository = require('../repositories/divisioni.repository');

//qui controllo business logic (tipo campo non nullo, autorizzazioni)

//GET all
function findAll(idSede, callback) {
    repository.findAll(idSede, callback);
}

//GET all by data
function findAllByData(idSede, data, callback) {
    repository.findAllByData(idSede, data, callback);
}

//POST
function create(idSede, data, callback) {
    if(data.targa && data.targa.length > 30) {
        const error = new Error('La targa non può superare i 30 caratteri');

        error.status = 400;
        error.code = 'FIELD_TOO_LONG';

        return callback(error);
    }

    //campi non nulli
    if (!data.persona || !data.badge || !data.categoria || !data.divisione) {
        const error = new Error('Persona, badge, categoria e divisione sono obbligatori');

        error.status = 400;
        error.code = 'INVALID_PARAMS_FIELD';

        return callback(error);
    }

    //divisione esiste
    divisioneRepository.findSedeById(data.divisione, (err, results) => {
        if (err) {
            return callback(err);
        }

        if (results.length === 0) {

            const error = new Error('Divisione non trovata');

            error.status = 400;
            error.code = 'DIVISION_NOT_FOUND';

            return callback(error);
        }

        //badge non ce l'ha qualcuno ancora dentro
        repository.badgeAlreadyTaken(data.badge, (err, badgeTakenResults) => {
            if (err) {
                return callback(err);
            }

            if (badgeTakenResults.length !== 0) {

                const error = new Error(
                    'Il badge è già in utilizzo al momento'
                );

                error.status = 400;
                error.code = 'BADGE_ALREADY_TAKEN';

                return callback(error);
            }

            //controllo che se è esterna ha personaRiferimento
            repository.isEsternaToSede(idSede, data.persona, (err, esternaResults) => {

                if (err) {
                    return callback(err);
                }

                //esterna alla sede -> per forza persona di riferimento
                if(esternaResults.length > 0 && !data.personaRiferimento) {
                    const error = new Error(
                        'La persona di riferimento è obbligatoria per gli ingressi esterni'
                    );

                    error.status = 400;
                    error.code = 'INVALID_PARAMS_FIELD';

                    return callback(error);
                }

                //interna alla sede -> per forza SENZA persona di riferimento
                if(esternaResults.length === 0 && data.personaRiferimento) {
                    const error = new Error(
                        'La persona di riferimento non deve esserci per gli ingressi interni'
                    );

                    error.status = 400;
                    error.code = 'INVALID_PARAMS_FIELD';

                    return callback(error);
                }

                repository.create(data, callback);
            });
        });
    });
}

//PUT
function registerExit(id, callback) {

    repository.registerExit(id, (err, results) => {

        if (err) {
            return callback(err);
        }

        if (results.affectedRows === 0) {

            const error = new Error('L\'accesso risulta già chiuso oppure non esiste');

            error.status = 400;
            error.code = 'ACCESS_ALREADY_CLOSED';

            return callback(error);
        }

        callback(null, results);
    });
}

//SEARCH
function search(idSede, campo, valore, callback) {
    const campiValidi = {    
        nome: 'per.nome',
        cognome: 'per.cognome',
        badge: 'b.codice',
        targa: 'i.targa',
        categoria: 'c.codice',
        azienda: 'a.ragione_sociale',
        divisione: 'd.nome',

        personaRiferimento: "CONCAT(pr.cognome, ' ', pr.nome)"
    };

    const campoSql = campiValidi[campo];

    if(!campoSql) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.search(idSede, campoSql, valore, callback);
}

//SEARCH by data
function searchByData(idSede, data, campo, valore, callback) {
    const campiValidi = {    
        nome: 'per.nome',
        cognome: 'per.cognome',
        badge: 'b.codice',
        targa: 'i.targa',
        categoria: 'c.codice',
        azienda: 'a.ragione_sociale',
        divisione: 'd.nome',

        personaRiferimento: "CONCAT(pr.cognome, ' ', pr.nome)"
    };

    const campoSql = campiValidi[campo];

    if(!campoSql) {
        
        const error = new Error('Campo di ricerca non valido');

        error.status = 400;
        error.code = 'INVALID_SEARCH_FIELD';

        return callback(error);
    }

    repository.searchByData(idSede, data, campoSql, valore, callback);
}

module.exports = { findAll, findAllByData, create, registerExit, search, searchByData };