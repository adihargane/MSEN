const db = require("../config/db");

const getWfeventtrnList = async (req, res) => {
  try {
    const { domainrecno = 0, instanceno = 0, wfrecno = 0 } = req.body;

    let searchQuery = "WHERE recno!=0";

    if (domainrecno !== 0) {
      searchQuery = searchQuery + ` AND domainrecno = ${domainrecno}`;
    }
    if (instanceno !== 0) {
      searchQuery = searchQuery + ` AND instanceno = ${instanceno}`;
    }
    if (wfrecno !== 0) {
      searchQuery = searchQuery + ` AND wfrecno = ${wfrecno}`;
    }

    const mainQuery = `SELECT * FROM wfeventtrn ${searchQuery}`;
    const [results, fields] = await db.execute(mainQuery);
    let wfeventtrnData = results;
    console.log("for in loop");
    for (const r in wfeventtrnData) {
      const wfeventtrnfooterQuery = ` SELECT * FROM wfeventtrnfooter WHERE mainrecno = ${wfeventtrnData[r].recno} `;
      const [results, fields] = await db.execute(wfeventtrnfooterQuery);
      wfeventtrnData[r].data = results;
    }

    res.status(200).json({
      Success: true,
      Count: wfeventtrnData.length,
      Message: wfeventtrnData,
    });
  } catch (error) {
    console.error(
      error.name +
        " in " +
        error.fileName +
        " at line " +
        error.lineNumber +
        ": " +
        error.message
    );
    res.status(400).json({ Success: false, Error: error });
  }
};

const addWfeventtrnDetails = async (req, res) => {
  try {
    const requestData = req.body;
    const domainrecno = requestData.domainrecno;
    const instanceno = requestData.instanceno;
    const wfrecno = requestData.wfrecno;
    const driverrecno = requestData.driverrecno || 0;
    const vehiclerecno = requestData.vehiclerecno || 0;

    if (domainrecno === undefined) {
      return res
        .status(400)
        .json({ Success: false, Error: "domainrecno is required" });
    }

    // Insert into main table
    const addIntoWfeventtrn =
      "INSERT INTO wfeventtrn (domainrecno, instanceno, wfrecno, driverrecno, vehiclerecno) VALUES (?, ?, ?, ?, ?)";
    const mainValues = [
      domainrecno,
      instanceno,
      wfrecno,
      driverrecno,
      vehiclerecno,
    ];
    await db.execute(addIntoWfeventtrn, mainValues);

    const getWfeventtrnRecno = "SELECT * FROM wfeventtrn ORDER BY recno DESC";
    const [results, fields] = await db.execute(getWfeventtrnRecno);
    const mainrecno = results[0].recno;

    const data = requestData.data;

    if (!data || data.length === 0) {
      // throw new Error("Send Data Array");
      res.status(400).json({ Success: false, Error: "Send data array" });
    }

    // Insert into footer table for each item in the data array
    for (const d of data) {
      d.mainrecno = mainrecno;
      const eventno = d.eventno;
      const refrecno = d.refrecno || 0;
      const status = d.status || 4;
      const entrydate = d.entrydate || 0;
      const entrytime = d.entrytime || 0;

      const addIntoWfeventtrnfooter =
        "INSERT INTO wfeventtrnfooter (mainrecno, eventno, refrecno, status, entrydate, entrytime) VALUES (?, ?, ?, ?, ?, ?)";
      const footerValues = [
        mainrecno,
        eventno,
        refrecno,
        status,
        entrydate,
        entrytime,
      ];

      await db.execute(addIntoWfeventtrnfooter, footerValues);
    }

    res.status(200).json({ Success: true, Message: "Data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Success: false, Error: error });
  }
};

module.exports = { getWfeventtrnList, addWfeventtrnDetails };
