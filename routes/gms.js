const express = require('express');
const router = express.Router();
const gmsController = require('../controllers/gms')
const validate = require('../utilities/validation')

router.get('/', gmsController.getAllGms);

router.get('/:id', 
    validate.checkMongoId,
    gmsController.getGm);

router.post('/', 
    validate.gmValidationRules(),
    validate.checkGm,
    gmsController.addGm)

router.put('/:id', 
    validate.checkMongoId,
    validate.gmValidationRules(),
    validate.checkGm,
    gmsController.updateGm);

router.delete('/:id', 
    validate.checkMongoId,
    gmsController.deleteGm)

module.exports = router;