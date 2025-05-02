
const crypto = require('crypto');
const User = require('../../model/User');
const Otp = require('../../model/OtpModel');
const bcrypt = require('bcryptjs');
const sendOtpEmail = require('../../config/nodemailer');
const generateOtp=()=>{
    return crypto.randomInt(100000, 999999).toString();
}

const requestOtp = async (req, res) => {
    try {
      const { formData } = req.body;
      if (!formData.email || ! formData.password || ! formData.username) {
        res.status(400).json({
          message: "fill the field properly",
        });
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(formData.email)) {
        return res.status(400).json({ message: "Enter a valid Gmail address" });
      }
  
      if (formData.password.length < 8) {
        res
          .status(400)
          .json({ message: "Password must be at least 8 characters long" });
        return;
      }
      const verifyemail = await User.findOne({ email: formData.email });
      if (verifyemail) {
        res.status(400).json({
          message: "email already use",
        });
        return;
      }
  
      if (/[A-Z]/.test(formData.username)) {
          return res.status(400).json({ message: "Username can only contain lowercase letters" });
      }
  
      if (formData.username.includes(" ")){
          return res.status(400).json({ message: "Username can't contain spaces" });
      }
      if (!/^[a-z0-9]+$/.test(formData.username)){
        return res.status(400).json({ message: "no special character are allowed" });
    }
      // Check if username already taken
      const checkUsername = await User.findOne({ username:formData.username});
      if (checkUsername) {
          return res.status(409).json({ message: "Username already taken" });
      }
      const emailid = await Otp.find({ email: formData.email });
      if (emailid.length >= 5) {
        return res
          .status(400)
          .json({ message: "your today otp limit is exceed" });
      }
      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expiry in 5 minutes
  
      await Otp.create({ email:formData.email, otp, expiresAt });
  
      await sendOtpEmail(formData.email, otp);
      res.status(200).json({ message: "OTP sent to your email" });
    } catch (error) {
      res
        .status(500)
        .json({ message:error.message });
    }
  };
  const verifyOtpanduser = async (req, res) => {
    try {
      const { email, otp, password, username } = req.body;
  console.log(email,otp,password,username)
      if (!email || !otp || !password || !username)
        return res.status(400).json({ message: "All credentials are require!!" });
  
      const otpRecord = await Otp.findOne({ otp });
      if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
  
      if (otpRecord.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP has expired" });
      }
      console.log("hello otp")
      await Otp.deleteOne({ _id: otpRecord._id }); // Remove OTP after verification
      const userinfo= new User({
        username,
      email,
      password:await bcrypt.hash(password,11)
      })
      await userinfo.save()
      res.status(200).json({ message: "signup successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error verifying OTP", error: error.message });
    }
  };

  module.exports = {requestOtp,verifyOtpanduser}