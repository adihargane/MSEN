const express = require("express");
const router = express.Router();
const drivermasterController = require("../controllers/drivermasterController.js");

router.get("/drivermaster", drivermasterController.getAllDrivermaster);
router.get("/drivermaster/:id", drivermasterController.getDrivermasterById);
router.post("/drivermaster", drivermasterController.createDrivermaster);
router.patch("/drivermaster", drivermasterController.updateDrivermaster);
router.delete("/drivermaster", drivermasterController.deleteDrivermaster);
router.delete("/filterdrivermaster", drivermasterController.filterDrivermaster);

module.exports = router;
