export const userActivationUrlEmailTemplate = ({
  email,
  name,
  activationUrl,
}) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email, //List of receivers
    subject: "Action Required- Activate new account",
    text: `hello ${name} , please follow the activation link to activate your account: ${activationUrl}`,
    html: `<div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
  <table
    style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    "
  >
    <tr>
      <td
        style="
          background: #2563eb;
          color: white;
          text-align: center;
          padding: 30px;
        "
      >
        <h1 style="margin: 0;">📚 Local Library</h1>
        <p style="margin-top: 10px;">
          Activate Your Account
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding: 40px;">
        <h2 style="color: #333;">
          Welcome, ${name}!
        </h2>

        <p style="color: #555; line-height: 1.6;">
          Thank you for creating an account with
          <strong>Local Library</strong>.
          To start borrowing books and accessing library services,
          please activate your account by clicking the button below.
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <a
            href="${activationUrl}"
            style="
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              padding: 14px 30px;
              border-radius: 8px;
              font-weight: bold;
              display: inline-block;
            "
          >
            Activate Account
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          If the button above doesn't work, copy and paste the following
          link into your browser:
        </p>

        <p style="word-break: break-all; color: #2563eb;">
          ${activationUrl}
        </p>

        <hr
          style="
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 30px 0;
          "
        />

        <p style="font-size: 13px; color: #888;">
          If you did not create this account, please ignore this email.
        </p>

        <p style="font-size: 14px; color: #555;">
          Regards,<br />
          <strong>Local Library Team</strong>
        </p>
      </td>
    </tr>

    <tr>
      <td
        style="
          background: #f8fafc;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #888;
        "
      >
        © ${new Date().getFullYear()} Local Library. All rights reserved.
      </td>
    </tr>
  </table>
</div>`,
  };
};

export const userAccountActivatedNotification = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email, //List of receivers
    subject: "Account Activated Successfully",
    text: `hello ${name}, your Local Library account has been activated successfully. You can now log in and start using your account.`,
    html: `<div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
  <table
    style="
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    "
  >
    <tr>
      <td
        style="
          background: #2563eb;
          color: white;
          text-align: center;
          padding: 30px;
        "
      >
        <h1 style="margin: 0;">📚 Local Library</h1>
        <p style="margin-top: 10px;">
          Account Activated
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding: 40px;">
        <h2 style="color: #333;">
          Welcome, ${name}!
        </h2>

        <p style="color: #555; line-height: 1.6;">
          Your <strong>Local Library</strong> account has been activated
          successfully. You can now log in and start borrowing books,
          managing your profile, and accessing library services.
        </p>

        <div style="text-align: center; margin: 35px 0;">
          <a
            href="${process.env.ROOT_URL}/login"
            style="
              background-color: #2563eb;
              color: #ffffff;
              text-decoration: none;
              padding: 14px 30px;
              border-radius: 8px;
              font-weight: bold;
              display: inline-block;
            "
          >
            Login Now
          </a>
        </div>

        <p style="color: #666; font-size: 14px;">
          If you did not activate this account, please contact Local Library
          support immediately.
        </p>

        <hr
          style="
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 30px 0;
          "
        />

        <p style="font-size: 13px; color: #888;">
          If you did not create this account, please ignore this email.
        </p>

        <p style="font-size: 14px; color: #555;">
          Regards,<br />
          <strong>Local Library Team</strong>
        </p>
      </td>
    </tr>

    <tr>
      <td
        style="
          background: #f8fafc;
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #888;
        "
      >
        © ${new Date().getFullYear()} Local Library. All rights reserved.
      </td>
    </tr>
  </table>
</div>`,
  };
};
