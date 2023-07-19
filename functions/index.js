const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.customEmail = functions.auth.user().onSendEmailVerification((user) => {
  const emailTemplate = `
    <h1>Customized email content goes here.</h1>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${user.emailVerificationLink}">Verify Email</a>
  `;

  const emailConfig = {
    from: {
      name: "Your App Name",
      email: "your-app@example.com",
    },
    replyTo: "your-app@example.com",
  };

  const emailOptions = {
    to: user.email,
    subject: "Email Verification",
    html: emailTemplate,
    ...emailConfig,
  };

  return admin
      .firestore()
      .collection("emailNotifications")
      .add(emailOptions)
      .then(() => {
        console.log("Custom email sent.");
      })
      .catch((error) => {
        console.error("Error sending custom email:", error);
      });
});
