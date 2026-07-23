function mockAuth(req, res, next) {
    req.user = {
        username: 'mario.rossi',
        permessi: ['INGRESSI_READ', 'INGRESSI_WRITE', 'DIVISIONI_READ', 'SEDI_READ', 'BADGE_READ', 'CATEGORIE_READ', 'PERSONE_INTERNE_READ', 'AZIENDE_READ']
    };
    next();
}

module.exports = mockAuth;