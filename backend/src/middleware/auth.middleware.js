const authRepository = require('../repositories/auth.repository');

async function loadUser(req, res, next) {

    try {
        if (!req.username) {
            return next();
        }

        const user = await authRepository.findByUsername(
            req.username
        );

        if(!user) {
            const err = new Error('Utente non autorizzato');
            err.status = 403;
            
            return next(err);
        }

        req.user = user;

        next();

    } catch(err) {
        next(err);
    }

}

module.exports = loadUser;