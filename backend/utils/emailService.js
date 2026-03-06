import nodemailer from 'nodemailer';
import logger from './logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, html, text = '') => {
  try {
    const mailOptions = {
      from: `"Paari Senthamizh Kalvi" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Paari Senthamizh Kalvi!';
  const html = `
    <h1>Welcome ${user.name}!</h1>
    <p>Thank you for joining Paari Senthamizh Kalvi. Your account has been successfully created.</p>
    <p>You can now access our Tamil education platform and start learning.</p>
    <br>
    <p>Best regards,<br>Paari Senthamizh Kalvi Team</p>
  `;

  return await sendEmail(user.email, subject, html);
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const subject = 'Password Reset Request';
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const html = `
    <h1>Password Reset</h1>
    <p>You requested a password reset for your Paari Senthamizh Kalvi account.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
    <br>
    <p>Best regards,<br>Paari Senthamizh Kalvi Team</p>
  `;

  return await sendEmail(user.email, subject, html);
};