const express = require('express');
const router = express.Router();

const permissions = require('../config/permessi');
const requirePermission = require('../middleware/require-permission');
const controller = require('../controllers/aziende.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/aziende:
 *   get:
 *     summary: Restituisce tutte le aziende
 *     tags:
 *       - Aziende
 *     responses:
 *       200:
 *         description: Elenco aziende
 *       404:
 *         description: Nessuna azienda trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: AZIENDA_NOT_FOUND
 *                 message: Azienda non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get('/', requirePermission(permissions.AZIENDE_READ), controller.findAll);

module.exports = router;