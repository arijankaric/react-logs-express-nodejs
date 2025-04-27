// const express = require('express');
// const router = express.Router();
// const travelLogController = require('../controllers/travelLogController');
// const auth = require('../middleware/auth');

// router.get('/', auth, travelLogController.getAllLogs);
// router.post('/', auth, travelLogController.createLog);
// // Add other CRUD routes...

// module.exports = router;

const express = require('express');
const router = express.Router();
const travelLogController = require('../controllers/travelLogController');
const auth = require('../middleware/auth');

router.get('/', auth, travelLogController.getAllLogs);
router.post('/', auth, travelLogController.createLog);
router.get('/:id', auth, travelLogController.getLogById);
router.put('/:id', auth, travelLogController.updateLog);
router.delete('/:id', auth, travelLogController.deleteLog);

module.exports = router;