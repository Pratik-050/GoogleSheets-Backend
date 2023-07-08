const mongoose = require("mongoose");

const EvaluatedCellSchema = new mongoose.Schema({
  cellId: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  sheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sheet",
    // required: true,
  },
});

const SheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cells: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EvaluatedCell",
    },
  ],
});

const EvaluatedCell = mongoose.model("EvaluatedCell", EvaluatedCellSchema);
const Sheet = mongoose.model("Sheet", SheetSchema);

module.exports = { EvaluatedCell, Sheet };
