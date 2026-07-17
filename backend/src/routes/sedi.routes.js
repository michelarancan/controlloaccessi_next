const express = require('express');
const router = express.Router();

const controller = require('../controllers/sedi.controller');

//qui gestisco le rotte

/**
 * @swagger
 * /api/sedi:
 *   get:
 *     summary: Restituisce tutte le sedi
 *     tags:
 *       - Sedi
 *     responses:
 *       200:
 *         description: Elenco sedi
 *       404:
 *         description: Nessuna sede trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 */
router.get('/', controller.findAll);

/**
 * @swagger
 * /api/sedi/{id}:
 *   get:
 *     summary: Restituisce la sede con l'ID specificato
 *     tags:
 *       - Sedi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Singola sede
 *       404:
 *         description: Sede non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 */
router.get('/:id', controller.findById);

/**
 * @swagger
 * /api/sedi:
 *   post:
 *     summary: Crea una nuova sede
 *     tags:
 *       - Sedi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede:
 *                 type: string
 *               ufficio:
 *                 type: string
 *             required:
 *               - sede
 *               - ufficio

 *     responses:
 *       201:
 *         description: Sede creata correttamente
 */
router.post('/', controller.create);

/**
 * @swagger
 * /api/sedi/{id}:
 *   put:
 *     summary: Modifica una sede
 *     tags:
 *       - Sedi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sede:
 *                 type: string
 *               ufficio:
 *                 type: string
 *             required:
 *               - sede
 *               - ufficio

 *     responses:
 *       200:
 *         description: Sede modificata correttamente
 *       404:
 *         description: Sede non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /api/sedi/{id}:
 *   delete:
 *     summary: Elimina una sede
 *     tags:
 *       - Sedi
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Sede eliminata correttamente
 *       404:
 *         description: Sede non trovata
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: SEDE_NOT_FOUND
 *                 message: Sede non trovata
 */
router.delete('/:id', controller.remove);

module.exports = router;