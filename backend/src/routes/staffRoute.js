/**
 * @swagger
 * /staff:
 *   post:
 *     summary: Créer un nouvel employé
 *     description: Ajoute un nouvel employé dans la base de données.
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               amount:
 *                 type: number
 *                 example: 500
 *               service:
 *                 type: string
 *                 enum: [Salle, Cuisine]
 *                 example: Salle
 *     responses:
 *       201:
 *         description: Employé créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /staff:
 *   get:
 *     summary: Obtenir la liste des employés
 *     description: Récupère une liste de tous les employés enregistrés dans la base de données.
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des employés récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 60a6743f4f1f2b3e8f9d47f3
 *                   name:
 *                     type: string
 *                     example: John
 *                   surname:
 *                     type: string
 *                     example: Doe
 *                   amount:
 *                     type: number
 *                     example: 500
 *                   service:
 *                     type: string
 *                     example: Salle
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /staff/{id}:
 *   get:
 *     summary: Obtenir un employé par ID
 *     description: Récupère les détails d'un employé en utilisant son identifiant unique.
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Détails de l'employé récupérés avec succès
 *       404:
 *         description: Employé non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /staff/{id}:
 *   put:
 *     summary: Mettre à jour un employé
 *     description: Met à jour les informations d'un employé existant.
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'employé
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               surname:
 *                 type: string
 *                 example: Doe
 *               amount:
 *                 type: number
 *                 example: 600
 *               service:
 *                 type: string
 *                 enum: [Salle, Cuisine]
 *                 example: Cuisine
 *     responses:
 *       200:
 *         description: Employé mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Employé non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /staff/{id}:
 *   delete:
 *     summary: Supprimer un employé
 *     description: Supprime un employé de la base de données en utilisant son identifiant.
 *     tags:
 *       - Staff
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'employé
 *     responses:
 *       200:
 *         description: Employé supprimé avec succès
 *       404:
 *         description: Employé non trouvé
 *       500:
 *         description: Erreur serveur
 */

const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, staffController.createStaff);
router.get('/', authMiddleware, staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id', authMiddleware, staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;
