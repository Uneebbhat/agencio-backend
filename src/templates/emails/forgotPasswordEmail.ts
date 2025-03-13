const forgotPasswordEmail = (userName: string, resetURL: string) => ({
  subject: "Reset Your Password – Action Required",
  body: `
    <html>
      <body style="font-family: Inter, sans-serif; color: #18181b; line-height: 1.5;">
        <h2>Hi ${userName},</h2>
        <p>We received a request to reset your password for your <strong>Agencio</strong> account. If you made this request, click the button below to set a new password:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="${resetURL}" style="text-decoration: none;">
            <button
              style="padding: 12px 24px; font-size: 16px; font-weight: bold; 
              color: #ffffff; background-color: #18181b; border-radius: 8px; border: none; 
              cursor: pointer; transition: background-color 0.2s ease-in-out;"
              onmouseover="this.style.backgroundColor='#2f2f31'"
              onmouseout="this.style.backgroundColor='#18181b'">
              Reset Password
            </button>
          </a>
        </div>

        <p>If you didn’t request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        <p>This link will expire in <strong>15 mintutes</strong>, so be sure to reset your password soon.</p>
                
        <p>Stay secure,</p>
        <p><strong>Agencio</strong><br>
        </p>
      </body>
    </html>
  `,
  to: userName,
});

export default forgotPasswordEmail;
