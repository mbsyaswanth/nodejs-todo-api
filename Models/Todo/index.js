var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["TODO", "INPROGRESS", "COMPLETED"],
    default: "TODO"
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", TodoSchema);
