const nodemailer = require('nodemailer');

// Create transporter configurable via env for Gmail or any SMTP provider
// Prefer SMTP_* if provided; otherwise fallback to Gmail service
const createTransporter = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  if (SMTP_HOST && EMAIL_USER && EMAIL_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? Number(SMTP_PORT) : 465,
      secure: SMTP_SECURE ? SMTP_SECURE === 'true' : true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  // Fallback to Gmail service (requires 2FA + App Password)
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER || 'your-email@gmail.com',
      pass: EMAIL_PASS || 'your-app-password',
    },
  });
};

// Send OTP email
const sendOTPEmail = async (email, name, otp, type = 'registration') => {
  try {
    // Development fallback: log OTP instead of sending email
    if (process.env.EMAIL_DEV_MODE === 'true') {
      console.log(`[DEV_MODE] OTP for ${email} (${type}): ${otp}`);
      return { success: true, dev: true };
    }

    const transporter = createTransporter();
    
    const emailType = type === 'registration' ? 'Account Registration' : 'Login Verification';
    const action = type === 'registration' ? 'complete your registration' : 'log in to your account';
    
    const mailOptions = {
      from: {
        name: 'Shivalik Service Hub',
        address: process.env.EMAIL_USER || 'your-email@gmail.com'
      },
      to: email,
      subject: `${emailType} - OTP Verification`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">Shivalik Service Hub</h1>
            <p style="color: #6b7280; margin: 5px 0;">Your trusted service partner</p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 30px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h2 style="color: #1f2937; margin-top: 0;">Hi ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for using Shivalik Service Hub. To ${action}, please use the following One-Time Password (OTP):
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #2563eb; color: white; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 8px; display: inline-block; letter-spacing: 8px;">
                ${otp}
              </div>
            </div>
            
            <div style="background-color: #fef3cd; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>⚠️ Important:</strong> This OTP is valid for 10 minutes only. Do not share it with anyone.
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you didn't request this ${type}, please ignore this email or contact our support team.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This email was sent by Shivalik Service Hub. Please do not reply to this email.
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
              © 2024 Shivalik Service Hub. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email after successful registration
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: 'Shivalik Service Hub',
        address: process.env.EMAIL_USER || 'your-email@gmail.com'
      },
      to: email,
      subject: 'Welcome to Shivalik Service Hub! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">🎉 Welcome to Shivalik Service Hub!</h1>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 30px; border-radius: 8px; border-left: 4px solid #2563eb;">
            <h2 style="color: #1f2937; margin-top: 0;">Hello ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Congratulations! Your account has been successfully created and verified. Welcome to the Shivalik Service Hub family!
            </p>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">What you can do now:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li>Browse our wide range of services</li>
                <li>Add items to your cart and make purchases</li>
                <li>Track your orders and service requests</li>
                <li>Manage your account and preferences</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173" style="background-color: #2563eb; color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; display: inline-block; font-weight: bold;">
                Start Exploring
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you have any questions or need assistance, feel free to contact our support team.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Thank you for choosing Shivalik Service Hub!
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
              © 2024 Shivalik Service Hub. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Verify transporter (called on server start for diagnostics)
const verifyEmailTransport = async () => {
  if (process.env.EMAIL_DEV_MODE === 'true') {
    console.log('[DEV_MODE] Email sending is disabled. OTPs will be logged to console.');
    return true;
  }
  const transporter = createTransporter();
  try {
    await transporter.verify();
    console.log('SMTP transporter is ready to send emails');
    return true;
  } catch (err) {
    console.error('SMTP transporter verification failed:', err.message);
    return false;
  }
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail,
  verifyEmailTransport
};
