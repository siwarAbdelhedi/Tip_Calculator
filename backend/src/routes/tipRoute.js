const express = require('express');
const router = express.Router();
const tipController = require('../controllers/tipController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, tipController.createTip);
router.get('/', tipController.getAllTips);
router.get('/period', tipController.getTipsByPeriod);
router.get('/:id', tipController.getTipById);
router.put('/:id', authMiddleware, tipController.updateTip);
router.delete('/:id', authMiddleware, tipController.deleteTip);

module.exports = router;