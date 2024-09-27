/**
 * @swagger
 * /calculate-tips:
 *   post:
 *     summary: Calculer et distribuer les pourboires
 *     description: Calcul des pourboires pour les employés sélectionnés
 *     tags:
 *       - Tips
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedStaff:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *               shift:
 *                 type: string
 *                 enum: [day, night]
 *     responses:
 *       200:
 *         description: Pourboires calculés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   service:
 *                     type: string
 *                   shift:
 *                     type: string
 *                   tips:
 *                     type: number
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */



const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');

router.post('/', tipController.createTip); 

module.exports = router;
