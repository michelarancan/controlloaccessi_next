const express = require('express');
const router = express.Router();

const controller = require('../controllers/divisioni.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/divisioni/sedi/{idS}:
 *   get:
 *     summary: Restituisce tutte le divisioni di una certa sede
 *     tags:
 *       - Divisioni
 *     parameters:
 *       - in: path
 *         name: idS
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Elenco divisioni di una certa sede
 *       404:
 *         description: Nessuna divisione trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: DIVISIONE_NOT_FOUND
 *                 message: Divisione non trovata
 *       500:
 *         description: Errore interno del server
 */
router.get('/sedi/:idS', controller.findAll);

module.exports = router;