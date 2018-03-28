const { validateEmail } = require('./utils/emailValidation');
const db = require('./utils/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const generator = require('generate-password');


// Adds recruiter and sends email with info
function adminAddRecruiter(req, res) {
    // Validate Email Format
    if (!validateEmail(req.body.EmailID)) {
        res.status(400)
            .json({ error: 'Bad Email Format' });
    }

    const fname = req.body.FirstName;
    const mname = req.body.MiddleName;
    const lname = req.body.LastName;
    const email = req.body.EmailID;
    const pass = generator.generate({
        length: 6,
        numbers: true,
    });
    const idComp = req.body.idCompany;
    if (email === undefined || pass === undefined || email === '' || pass === '') {
        return res.status(400)
            .json({ error: 'Email ID or Password cannot be empty' });
    }
    bcrypt.hash(pass, Number(process.env.ROUNDS), (err, hash) => {
        if (err) {
            return res.status(401)
                .json({ error: err });
        }
        const post = {
            FirstName: fname,
            MiddleName: mname,
            LastName: lname,
            EmailID: email,
            Password: hash,
            idCompany: idComp,
        };
        const sql1 = 'INSERT INTO User SET ?';
        db.query(sql1, post, (db_err4, result1) => {
            if (db_err4) {
                return (res.status(400)
                    .send({ error: db_err4 }));
            }
            const transporter = nodemailer.createTransport({
                service: 'outlook',
                host: 'mail.outlook.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'makeithire@outlook.com',
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            const fullname = `${req.body.FirstName} ${req.body.MiddleName} ${req.body.LastName}`;
            const signature = ''; // TODO add email 2 here

            const mailOptions = {
                from: 'makeithire@outlook.com',
                to: req.body.EmailID,
                subject: 'Your MakeItHire Recruiter account has been generated',
                text: `Congratulations ${fullname}! \n\n Your MakeItHire Recruiter Account has 
          been generated.\n\nPlease use the following to Login Information:\n\nLink: 
          www.makeithire.com\nEmail:${req.body.EmailID}\nPassword: ${pass}`,
                html: signature,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(400)
                        .json({ error });
                }
                return res.status(200)
                    .json({
                        message: `Email Sent to ${req.body.EmailID}`,
                        response: info.response
                    });
            });
        });
    });
}

// Finds and delete recruiter
function adminDeleteRecruiter(req, res) {
    const emailId = req.body.EmailID;
    const sql = 'DELETE FROM User WHERE EmailID = \'' + emailId + '\'';
    db.query(sql, (err, res) => {
        if (err) {
            return res.status(400)
                .json({ error: err });
        }

        return res.status(200)
            .json({ message: 'Success' });
    });
}

module.exports = {
    adminAddRecruiter,
    adminDeleteRecruiter,
};
