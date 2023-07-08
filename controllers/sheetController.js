const {
  EvaluatedCell,
  Sheet,
} = require("../model/EvaluatedCellAndSheetSchema");

const evaluatedCellHandler = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const { cellId, value } = req.body;

    const sheet = await Sheet.findById(sheetId);
    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    let evaluatedCell = await EvaluatedCell.findOne({ sheet: sheetId, cellId });
    if (evaluatedCell) {
      // Update the existing evaluated cell's value
      evaluatedCell.value = value;
    } else {
      evaluatedCell = new EvaluatedCell({
        cellId,
        value,
        sheet: sheetId,
      });
    }

    await evaluatedCell.save();

    if (!sheet.cells.includes(evaluatedCell._id)) {
      sheet.cells.push(evaluatedCell._id);
    }

    // sheet.cells.push(evaluatedCell._id);
    await sheet.save();

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
