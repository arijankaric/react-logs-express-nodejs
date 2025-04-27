// const express = require('express');
// const router = express.Router();
// const journeyPlanController = require('../controllers/journeyPlanController');
// const auth = require('../middleware/auth');

// router.get('/', auth, journeyPlanController.getAllPlans);
// router.post('/', auth, journeyPlanController.createPlan);
// // Add other CRUD routes...

// module.exports = router;

const express = require('express');
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController');
const auth = require('../middleware/auth');

// Make sure all controller methods are properly referenced
router.get('/', auth, journeyPlanController.getAllPlans);
router.post('/', auth, journeyPlanController.createPlan);
router.get('/:id', auth, journeyPlanController.getPlanById);
router.put('/:id', auth, journeyPlanController.updatePlan);
router.delete('/:id', auth, journeyPlanController.deletePlan);

module.exports = router;