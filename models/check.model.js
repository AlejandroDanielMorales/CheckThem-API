const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const checksSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  dateOfEmission: { type: Date, required: true },
  dateOfExpiration: { type: Date, required: true },
  providerName: { type: String, required: true, trim: true, maxlength: 100 },
  profilePicture: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 },
  payed: { type: Boolean, default: false }
}, { timestamps: true });
  

module.exports = mongoose.model("Checks",checksSchema);
