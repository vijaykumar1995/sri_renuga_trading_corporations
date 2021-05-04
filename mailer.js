import nodemailer from 'nodemailer';

// function setup() {
//   return nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
// }

export function signupResetPasswordLink(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email_id,
    subject: 'Hibiz solutions App-Login Instructions',
    text: `You have successfully registered as an user in weekly status report App. Please click the link to reset the password.
    ${user.generateResetPasswordLink()}`
  };
  // transport.sendMail(email);
}