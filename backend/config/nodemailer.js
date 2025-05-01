const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // App Password (not Gmail password)
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table style="width: 100%; background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td>
              <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333333;">Hello,</h2>
                <p style="color: #555555;">You requested a One-Time Password (OTP) for your account verification.</p>
                <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</p>
                <p style="color: #555555;">Please use the OTP above to complete your verification. This OTP is valid for the next 10 minutes.</p>
                <p style="color: #555555;">If you did not request this, please ignore this message.</p>
                <br/>
                <footer style="text-align: center; color: #888888; font-size: 12px;">
                  <p>© 2025 Your Company | All rights reserved</p>
                </footer>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;