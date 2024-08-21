const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = Schema({
  itemName: String,
  description: String,
  image: Object,
  dateCreated: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
