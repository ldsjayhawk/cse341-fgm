const express = require('express');
const router = express.Router();
const draftPlayersController = require('../controllers/draftPlayers')

router.get('/', draftPlayersController.getAll);
router.get('/:id', draftPlayersController.getDraftPlayer);

router.post('/', draftPlayersController.addDraftPlayer)
router.put('/:id', draftPlayersController.updateDraftPlayer)
router.delete('/:id', draftPlayersController.deleteDraftPlayer)

module.exports = router;