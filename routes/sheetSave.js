const express = require("express");
const {
  sheetHandler,
  evaluatedCellHandler,
} = require("../controllers/sheetController");
const linkHandler = require("../controllers/linkController");
const router = express.Router();

router.use("/", sheetHandler);

router.use("/:sheetId/evaluated-cells", evaluatedCellHandler);

router.get("/:sheetId/shareable-link", linkHandler);

module.exports = router;
