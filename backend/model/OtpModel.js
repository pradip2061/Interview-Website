const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true,index: { expires: 3300 } },
});

const Otp = mongoose.model("Otp", OtpSchema);

module.exports=Otp