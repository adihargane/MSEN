const DrivermasterModel = require("../models/drivermasterModel.js");

// Get all active=1 drivers
const getAllDrivermaster = async (req, res) => {
  try {
    const drivers = await DrivermasterModel.findAll({
      where: {
        active: 1,
      },
    });

    const count = drivers.length;
    res.status(200).json({ Success: true, Count: count, Message: drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(400).json({ Success: false, Error: error });
  }
};

// // Get all drivers
// const getAllDrivermaster = async (req, res) => {
//   try {
//     const drivers = await DrivermasterModel.findAll();
//     res.status(200).json({ Success: true, Message: drivers });
//   } catch (error) {
//     console.error("Error fetching drivers:", error);
//     res.status(400).json({ Success: false, Error: error });
//   }
// };

// Get a single driver by ID
const getDrivermasterById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await DrivermasterModel.findByPk(id);

    if (!driver) {
      res.status(400).json({ Success: false, Error: "Driver not found" });
    }

    if (driver.active === true) {
      return res.status(200).json({ Success: true, Message: driver });
    } else {
      return res
        .status(400)
        .json({ Success: false, Error: "Driver not found" });
    }
  } catch (error) {
    console.error("Error fetching driver:", error);
    res.status(400).json({ Success: false, Error: error });
  }
};

// Create a new driver
const createDrivermaster = async (req, res) => {
  const newDriverData = req.body;
  console.log("newDriverData", newDriverData);
  try {
    const newDriver = await DrivermasterModel.create(newDriverData);
    res.status(200).json({ Success: true, Message: newDriver });
  } catch (error) {
    console.error("Error creating driver:", error);
    res.status(400).json({ Success: false, Error: error });
  }
};

// Update an existing driver by ID
const updateDrivermaster = async (req, res) => {
  const updateDriverData = req.body;

  try {
    if (updateDriverData.recno) {
      const driver = await DrivermasterModel.findByPk(updateDriverData.recno);

      if (!driver) {
        res.status(400).json({ Success: false, Error: "Driver not found" });
      }

      const updateFields = {};

      if (updateDriverData.tenantrecno) {
        updateFields.tenantrecno = updateDriverData.tenantrecno;
      }
      if (updateDriverData.mobile) {
        updateFields.mobile = updateDriverData.mobile;
      }
      if (updateDriverData.descn) {
        updateFields.descn = updateDriverData.descn;
      }
      if (updateDriverData.active) {
        updateFields.active = updateDriverData.active;
      }
      if (updateDriverData.rating) {
        updateFields.rating = updateDriverData.rating;
      }

      await driver.update(updateFields);

      res.status(200).json({ success: true, message: driver });
    } else {
      res.status(400).json({ success: false, error: "recno is required" });
    }
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(400).json({ Success: false, Error: error });
  }
};

// Delete a driver by ID
const deleteDrivermaster = async (req, res) => {
  try {
    const { recno } = req.body;

    if (recno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "recno is required" });
    }

    const driver = await DrivermasterModel.findByPk(recno);

    if (!driver) {
      res.status(400).json({ Success: false, Error: "Driver not found" });
    }

    driver.active = false;
    await driver.save();

    res
      .status(200)
      .json({ success: true, message: "Driver deleted succussfully" });
  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(400).json({ Success: false, Error: error });
  }
};

//Filter drivermaster API
const filterDrivermaster = async (req, res) => {
  try {
    const { tenantrecno = 0, descn = null, mobile = null } = req.body;

    filterFields = {
      active: 1,
    }

    if (tenantrecno !== 0){
      filterFields.tenantrecno = tenantrecno;
    }
    if (descn !== null){
      filterFields.descn = descn;
    }
    if (mobile !== null){
      filterFields.mobile = mobile;
    }
    
    const drivers = await DrivermasterModel.findAll({
      where: filterFields
    });

    console.log(filterFields)

    const count = drivers.length;
    res.status(200).json({ Success: true, Count: count, Message: drivers });

  } catch (error) {
    console.error("Error updating driver:", error);
    res.status(400).json({ Success: false, Error: error });
  }
}


module.exports = {
  getAllDrivermaster,
  getDrivermasterById,
  createDrivermaster,
  updateDrivermaster,
  deleteDrivermaster,
  filterDrivermaster,
};
