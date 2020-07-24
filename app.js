const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors({ "origin": "*" }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/send', (req, res) => {
    console.log("Request came");
    console.log(`Data: ${req.body}`);
    let contact = req.body;
    res.send();
    const output = `
        <p>You have a new message!</p>
        <h3>Contact details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Phone: ${req.body.phone}</li>
            <li>Email: ${req.body.mail}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'andjelajacimovic118@gmail.com',
            pass: 'oqrkvqhkvrkmeksl'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Contact" <andjelajacimovic118@gmail.com>', // sender address
        to: 'grujicdragan93@gmail.com, sokovicstefan@hotmail.com', // list of receivers
        subject: 'Muscle Factory site Contact Request', // Subject line
        text: 'Hello', // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
});





app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
});