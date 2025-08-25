const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using your configured email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email with a one-time password (OTP).
 * @param {string} toEmail - The recipient's email address.
 * @param {string} otp - The one-time password to send.
 */
const sendVerificationEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'DearRegards: Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Email Verification</h2>
        <p>Thank you for registering with DearRegards. To complete your registration, please use the following one-time password (OTP):</p>
        <h3 style="background: #ecf0f1; padding: 10px 20px; border-radius: 5px; display: inline-block;">${otp}</h3>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br/>The DearRegards Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${toEmail}`);
  } catch (error) {
    console.error(`Error sending email to ${toEmail}:`, error);
    throw new Error('Could not send verification email.');
  }
};

module.exports = { sendVerificationEmail };