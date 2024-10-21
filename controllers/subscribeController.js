const nodemailer = require('nodemailer');
const subscribeToEmail = async (req, res) => {
    const { email } = req.body;
  
    if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
      return res.status(400).send('Invalid Gmail address.');
    }
  
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        }
      });
    
   
      let mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email,
        subject: 'Thank you for subscribing IMAGINE AI!',
        text: 'Thank you for subscribing to our platform!',
        html: '<h1>Thank you!</h1><p>You have successfully subscribed to our platform.</p>',
      };
    
  

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to ' + email);
      res.status(200).send('Subscription successful. Thank you email sent!');
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).send('Error sending email.');
    }
  }

  module.exports = {
    subscribeToEmail,
  };