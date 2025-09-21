const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players')

router.get('/', playersController.getAll);
router.get('/:id', playersController.getPlayer);

router.post('/', playersValidationRules, playersController.addPlayer)
router.put('/:id', playersValidationRules, playersController.updatePlayer)
router.delete('/:id', playersController.deletePlayer)

module.exports = router;