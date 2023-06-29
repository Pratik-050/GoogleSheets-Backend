const {
  EvaluatedCell,
  Sheet,
} = require("../model/EvaluatedCellAndSheetSchema");

const evaluatedCellHandler = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const { cellId, value } = req.body;

    const evaluatedCell = new EvaluatedCell({
      cellId,
      value,
      sheet: sheetId,
    });

    await evaluatedCell.save();

    // Add the evaluated cell to the sheet's cells array
    const sheet = await Sheet.findByIdAndUpdate(
      sheetId,
      { $push: { cells: evaluatedCell._id } },
      { new: true }
    );

    res.status(201).json({ message: "Evaluated cell saved", sheet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sheetHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const sheet = new Sheet({
      name,
    });

    await sheet.save();

    res.status(201).json({ message: "Sheet created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sheetHandler, evaluatedCellHandler };
