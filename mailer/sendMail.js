const path = require("path");
const ejs = require("ejs");
const transporter = require("./transporter");

const sendRegistrationEmail = async ({ name, email }) => {
  const templatePath = path.join(
    __dirname,
    "../views/includes/register.mail.ejs"
  );

  const emailTemplate = await ejs.renderFile(templatePath, {
    name,
  });

  const mainOptions = {
    from: '"Suraj Pratap" surajpratap20002003@gmail.com',
    to: email,
    subject: "Account Created",
    html: emailTemplate,
  };

  await transporter.sendMail(mainOptions);
};

module.exports = sendRegistrationEmail;
