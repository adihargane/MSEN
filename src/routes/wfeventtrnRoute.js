const express = require("express");
const router = express.Router();
const wfeventtrnController = require("../controllers/wfeventtrnController.js");

router.post("/getwfeventtnlist", wfeventtrnController.getWfeventtrnList);
router.post("/addwfeventtrndetails", wfeventtrnController.addWfeventtrnDetails);

module.exports = router;
