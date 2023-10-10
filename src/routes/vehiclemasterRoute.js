const express = require('express');
const router = express.Router();
const vehiclemasterController = require('../controllers/vehiclemasterController.js');


//CRUD API of vehiclemaster
router.get('/vehiclemaster', vehiclemasterController.getVehiclemaster);
router.post('/vehiclemaster', vehiclemasterController.insertVehiclemaster);
router.patch('/vehiclemaster', vehiclemasterController.updateVehiclemaster);
router.delete('/vehiclemaster', vehiclemasterController.deleteVehiclemaster);

//Filter API of vehiclemaster
router.post('/filtervehiclemaster', vehiclemasterController.filterVehiclemaster);


module.exports = router;
