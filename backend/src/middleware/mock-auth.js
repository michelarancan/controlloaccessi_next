function mockAuth(req, res, next) {
    req.user = {
        username: 'mario.rossi',
        permessi: ['INGRESSI_READ', 'INGRESSI_WRITE', 'DIVISIONI_READ', 'SEDI_READ']
    };
    next();
}

module.exports = mockAuth;