const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')


const sendEmailEthereal = async (req, res) => {
    let testaccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'augustus5@ethereal.email',
            pass: 'ZpGYg4Xp3V8S3mkabR'
        }
        });
        console.log(transporter);
    let info = await transporter.sendMail({
        from: '"dawaladeny 👻" <edgarharambe@gmail.com>', // sender address
        to: "edgarharambe@gmail.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world??</b>", // html body
    })
    res.json(info)
}
const sendEmailSendGrid = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'edgarharambe@gmail.com', // Change to your recipient
        from: 'edgarharambe@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'hey klant, hoe gaat ie?',
          }
   const info = await sgMail.send(msg);
   res.json(info)
}

const sendEmail= async (req, res) => {
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "edgarharambe@gmail.com",
          pass: process.env.GMAIL, 
           },
        tls: {
          rejectUnauthorized: false
        }
      })
     
      const mailOptions = {
        from: "edgarharambe@gmail.com",
        to: "edgarharambe@gmail.com", // reciever
        subject: "Email send by node.js",
        html: "<h2>Email Heading: (Gmail SMTP + Node.js)</h2><p>this email is just for learnign porpuse</p><button>Verify Email</button>"
      }
     
      const info = await transporter.sendMail(mailOptions)
     
      res.json(info)
}
module.exports = sendEmail;