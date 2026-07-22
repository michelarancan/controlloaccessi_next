function requirePermission(permessoRichiesto) {
    return function(req, res, next) {
        if(!req.user) {
            const err = new Error('Utente non autenticato');
            err.status = 401;
            err.code = 'NOT_AUTHENTICATED';
            return next(err);
        }

        if(!req.user.permessi.includes(permessoRichiesto)) {
            const err = new Error('Permesso non concesso');
            err.status = 403;
            err.code = 'PERMISSION_DENIED';
            return next(err);
        }

        next();
    };
}

module.exports = requirePermission;