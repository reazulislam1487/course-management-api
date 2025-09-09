const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const auth = require('../middleware/authMiddleware');
const { purchaseValidation } = require('../middleware/validateRequest');

router.post('/', auth, purchaseValidation, purchaseController.purchaseCourse);
router.get('/me', auth, purchaseController.getMyPurchases);

module.exports = router;
