const express = require('express');
const router = express.Router();
const gmsController = require('../controllers/gms')

router.get('/', gmsController.getAllGms);
router.get('/:id', gmsController.getGm);

router.post('/', gmsController.addGm)
router.put('/:id', gmsController.updateGm)
router.delete('/:id', gmsController.deleteGm)

module.exports = router;