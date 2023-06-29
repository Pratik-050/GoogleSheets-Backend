const { Sheet } = require("../model/EvaluatedCellAndSheetSchema");

const linkHandler = async (req, res) => {
  try {
    const { sheetId } = req.params;

    const sheet = await Sheet.findById(sheetId).populate("cells");

    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    // Generate a shareable link using the sheet ID
    const shareableLink = `https://localhost:3500/sheets/${sheetId}`;

    res.status(200).json({ shareableLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = linkHandler;
