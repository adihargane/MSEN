const db = require("../config/db.js");

// GET API
const getVehiclemaster = async (req, res) => {
  try {
    const getVehiclemasterQuery = "SELECT * FROM vehiclemaster";
    const [results, fields] = await db.execute(getVehiclemasterQuery);

    res.status(200).json({ Success: true, Message: results, Extra: fields });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Success: false, error: "Internal Server Error" });
  }
};

// POST API
const insertVehiclemaster = async (req, res) => {
  try {
    const {
      tenantrecno,
      vechno,
      ownerdomainrecno,
      vechmakerecno = 0,
      vechtyperecno = 0,
      active = true,
    } = req.body;

    if (tenantrecno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "tenantrecno is required" });
    }
    if (vechno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "vechno is required" });
    }
    if (ownerdomainrecno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "ownerdomainrecno is required" });
    }

    const insertVehiclemasterQuery =
      "INSERT INTO vehiclemaster (tenantrecno, vechno, ownerdomainrecno, vechmakerecno, vechtyperecno, active) VALUES ( ?, ?, ?, ?, ?, ? )";
    const insertVehiclemasterValues = [
      tenantrecno,
      vechno,
      ownerdomainrecno,
      vechmakerecno,
      vechtyperecno,
      active,
    ];
    await db.execute(insertVehiclemasterQuery, insertVehiclemasterValues);

    res.status(200).json({ Success: true, Message: "Data added successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Success: false, Error: error });
  }
};

//PATCH API
const updateVehiclemaster = async (req, res) => {
  try {
    const {
      recno,
      tenantrecno,
      vechno,
      ownerdomainrecno,
      vechmakerecno = 0,
      vechtyperecno = 0,
      active = true,
    } = req.body;

    if (recno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "recno is required" });
    }

    const updateVehiclemasterQuery =
      "UPDATE vehiclemaster SET tenantrecno=?, vechno=?, ownerdomainrecno=?, vechmakerecno=?, vechtyperecno=?, active=? WHERE recno=?";
    const updateVehiclemasterValues = [
      tenantrecno,
      vechno,
      ownerdomainrecno,
      vechmakerecno,
      vechtyperecno,
      active,
      recno,
    ];
    await db.execute(updateVehiclemasterQuery, updateVehiclemasterValues);

    res
      .status(200)
      .json({ Success: true, Message: "Data updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Success: false, Error: error });
  }
};

//DELETE API
const deleteVehiclemaster = async (req, res) => {
  try {
    const { recno } = req.body;

    if (recno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "recno is required" });
    }

    const deleteVehiclemasterQuery =
      "UPDATE vehiclemaster SET active=0 WHERE recno=?";
    const deleteVehiclemasterValues = [recno];
    await db.execute(deleteVehiclemasterQuery, deleteVehiclemasterValues);

    res
      .status(200)
      .json({ Success: true, Message: "Data delete successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Success: false, Error: error });
  }
};

//Filter API
const filterVehiclemaster = async (req, res) => {
  try {
    const { tenantrecno = 0, vechno = null, ownerdomainrecno = 0 } = req.body;

    let searchQuery = "WHERE active=1";

    if (tenantrecno !== 0) {
      searchQuery = searchQuery + ` AND tenantrecno = ${tenantrecno}`;
    }
    if (vechno !== null) {
      searchQuery = searchQuery + ` AND vechno = '${vechno}'`;
    }
    if (ownerdomainrecno !== 0) {
      searchQuery = searchQuery + ` AND ownerdomainrecno = ${ownerdomainrecno}`;
    }

    const mainQuery = `SELECT recno, tenantrecno, vechno, ownerdomainrecno, vechmakerecno, vechtyperecno, active FROM vehiclemaster ${searchQuery}`;

    const [results, fields] = await db.execute(mainQuery);

    res.status(200).json({ Success: true, Message: results });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Success: false, Error: error });
  }
};

module.exports = {
  getVehiclemaster,
  insertVehiclemaster,
  updateVehiclemaster,
  deleteVehiclemaster,
  filterVehiclemaster,
};
