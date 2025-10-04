const nodemailer = require('nodemailer');

// Create transporter with explicit Gmail settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Verify transporter on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

const sendVerificationEmail = async (toEmail, otp) => {
  console.log('=== EMAIL SERVICE: Starting to send email ===');
  console.log('To:', toEmail);
  console.log('OTP:', otp);
  console.log('From email:', process.env.EMAIL_USER);
  
  const mailOptions = {
    from: `"DearRegards" <${process.env.EMAIL_USER}>`,
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
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to', toEmail);
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return info;
  } catch (error) {
    console.error('=== EMAIL SERVICE ERROR ===');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    console.error('=== EMAIL SERVICE ERROR END ===');
    throw new Error('Could not send verification email.');
  }
};

module.exports = { sendVerificationEmail };