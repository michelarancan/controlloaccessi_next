const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/categorie.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/categorie:
 *   get:
 *     summary: Restituisce tutte le categorie
 *     tags:
 *       - Categorie
 *     responses:
 *       200:
 *         description: Elenco categorie
 *       404:
 *         description: Nessuna categoria trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: CATEGORIA_NOT_FOUND
 *                 message: Categoria non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get('/', requirePermission(permissions.CATEGORIE_READ), controller.findAll);

module.exports = router;