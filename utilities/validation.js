const { body, validationResult } = require('express-validator')
const { ObjectId } = require('mongodb')
const validate = {}

validate.MongoId = async(req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Id format' });
  }
  return next();
};

validate.draftPlayerValidationRules = () => {
    return [
        body('firstName').isString().notEmpty().isLength({min:2, max:30}).withMessage('First Name must be between 2 and 30 letters'),
        body('lastName').isString().notEmpty().isLength({min:2, max:30}).withMessage('Last Name must be between 2 and 30 letters'),
        body('position').isString().notEmpty().isLength({min:2, max:3}).withMessage('Position must be 2 or 3 characters'),
        body('rank').optional().isNumeric().notEmpty().isInt({min:1, max:500}).withMessage('Rank must be a number under 500'),
        body('position').isString().notEmpty().isLength({min:2, max:3}).withMessage('Position must be between 2 and 3 letters')
    ]
};

validate.gmValidationRules = () => {
    return [
        body('gmName').isString().notEmpty().isLength({min:2, max:30}).withMessage('GM Name must be between 2 and 30 letters'),
        body('gmNumber').optional().isNumeric().isLength({min:1, max:100000}).withMessage('GM Number must be between 1 and 10 numbers'),
        body('email').isEmail().notEmpty().withMessage('Invalid email format'),
        body('profslId').isString().notEmpty().isLength({min:2, max:30}).withMessage('ProFSL ID must be between 2 and 30 characters'),
        body('fantraxId').isString().notEmpty().isLength({min:2, max:30}).withMessage('Fantrax ID must be between 2 and 30 characters'),
        body('joinDate').optional().notEmpty().isISO8601().isBefore(new Date().toISOString().split('T')[0]),
        body('current').isNumeric().notEmpty().isInt({min:0, max:1}).withMessage('Enter 1 for yes and 0 for no')
    ]
}

function validateDraftPlayer(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    return next();
};

function validateGm(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    return next();
};

module.exports = { validateMongoId, draftPlayerValidationRules, gmValidationRules, validateDraftPlayer, validateGm }