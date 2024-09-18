const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');


/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant unique du service
 *         name:
 *           type: string
 *           description: Nom du service
 *         description:
 *           type: string
 *           description: Description du service
 *       example:
 *         id: 60bdf3bf8309ec1f0cfd4a5c
 *         name: Shift de Nuit
 *         description: Service de nuit pour l'équipe A
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Créer un nouveau service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Le service a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 */
router.post('/', serviceController.createService);

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Récupérer la liste de tous les services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: La liste des services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', serviceController.getAllServices);


router.post('/', serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;