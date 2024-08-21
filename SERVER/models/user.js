const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  dateCreated: { type: Date, default: Date.now },
  owns: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
