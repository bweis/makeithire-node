/*********************************
 *  MakeItHire Server
 *********************************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const env = require('dotenv/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookie = require('cookie');
const cors = require('cors');
const mime = require('mime-types');
const multer = require('multer');
const fs = require('fs');
const app = express();

//Use bodyParser to read request body data
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Set app port
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

// Server Launch (without any api)
app.use(express.static("Front-End"));


app.get('/', function (req, res) {
    return res.sendFile(__dirname + '/Front-End/loginPage.html')
});


app.get('/main', function (req, res) {
    return res.sendFile(__dirname + '/client/public/index.html')
});
/*app.get('/', function (req, res) {
    res.send('MakeItHire Test Server');
});*/

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Database Connection
var mysql = require('mysql');
var db = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_NAME
});
db.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MIH database.');
});

// POST API: Add Student into User Table





app.post('/api/signUpStudent', (req, res) => {
    var fname = req.body.FirstName; var mname = req.body.MiddleName; var lname = req.body.LastName;
    var email = req.body.EmailID;
    var pass = req.body.Password;
    if (email === undefined || pass === undefined || email === "" || pass === "") {
        return res.status(400).json({ error: "Email ID or Password cannot be empty" });
    }
    bcrypt.hash(req.body.Password, Number(process.env.ROUNDS), function (err, hash) {
        let post = { FirstName: fname, MiddleName: (mname === undefined) ? mname : "", LastName: lname, EmailID: email, Password: hash, idCompany: 0 };
        let sql = 'INSERT INTO User SET ?';
        db.query(sql, post, (db_err1, result) => {
            if (db_err1) {
                return res.status(400).json({ message: db_err1 });
            }
            else {
                sql2 = 'INSERT INTO Student VALUES (\'' + result.insertId + '\', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)';
                db.query(sql2, (db_err2, result2) => {
                    if (db_err2) {
                        return res.status(400).json({ error: db_err2 });
                    }
                    else {
                        return res.status(200).json({ message: "Account created" });
                    }
                });
            }
        });
    });
});

// POST API: Add Student Details into Student Table
app.post('/api/updateStudentDetails', verifyToken, (req, res) => {
    var university = req.body.University;
    var major = req.body.Major;
    var gradyear = req.body.GraduationYear;
    var curr_degree = req.body.CurrentPursuingDegree;
    var last_degree = req.body.HighestDegreeLevel;
    var skills = req.body.Skills;
    var projects = req.body.Projects;
    var bio = req.body.Bio;
    var phone = req.body.PhoneNumber;
    var links = req.body.Links;
    var resume = null;
    var coverLetter = null;
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            res.sendStatus(401).json({ error: auth_err });
        } else {
            let sql = 'UPDATE Student SET University = (SELECT idUniversity From University WHERE UnivName =  \'' + university + '\'), Major = (SELECT idMajor From Major WHERE MajorName =  \'' + major + '\'), GraduationYear = ' + gradyear + ', CurrentPursuingDegree = (SELECT idDegree From Degree WHERE Level = \'' + curr_degree + '\'), HighestDegreeLevel = (SELECT idDegree From Degree WHERE Level = \'' + last_degree + '\'), Skills = \'' + skills + '\', Projects = \'' + projects + '\', Bio = \'' + bio + '\', PhoneNumber = \'' + phone + '\', Links = \'' + links + '\' WHERE idUser = (SELECT idUser FROM User WHERE TokenID = \'' + token + '\')';
            console.log(sql);
            db.query(sql, (db_err1, result) => {
                if (db_err1) {
                    return res.status(400).json({ error: db_err1 });
                }
                else {
                    return res.status(200).json({ message: "Success" });
                }
            })
        }
    });
});

// GET API: Get Student Details
app.get('/api/getStudentDetails', verifyToken, (req, res) => {
    let sql = 'Select U.UnivName As University, M.MajorName As Major, D1.Level As CurrentDegreePursuing, D2.Level As HighestDegreeLevel, S.GraduationYear, S.Skills, S.Projects, S.Bio, S.PhoneNumber, S.Links From Degree D1, Degree D2, Major M, University U, (Select * From Student Where idUser = (Select idUser From User Where TokenID = \'' + req.token + '\')) S WHERE U.idUniversity = S.University AND M.idMajor = S.Major AND D1.idDegree = S.CurrentPursuingDegree AND D2.idDegree = S.HighestDegreeLevel';
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            return res.status(401).json({ error: auth_err });
        } else {
            db.query(sql, (err1, result) => {
                console.log(result);
                if (err1) {
                    return res.status(401).json({ message: err1 });
                }
                else {
                    return res.status(200).json({ response: result });
                }
            })
        }
    });
});

// POST API: Sign Up Recruiter along with Company and Assigning Head Recruiter
app.post('/api/signUpRecruiter', (req, res) => {
    var fname = req.body.FirstName;
    var mname = req.body.MiddleName;
    var lname = req.body.LastName;
    var bdate = req.body.BirthDate;
    var email = req.body.EmailID;
    var pass = req.body.Password;
    var photo = req.body.Photo;
    var idComp = req.body.idCompany;
    var companyname = req.body.CompanyName;
    var description = req.body.Description;
    var emailDomain = req.body.EmailID.split("@", 2);
    var published = req.body.Published;
    bcrypt.hash(pass, Number(process.env.ROUNDS), function (err, hash) {
        let post = { FirstName: fname, MiddleName: null, LastName: lname, BirthDate: bdate, EmailID: email, Password: hash, idCompany: idComp };
        let sql1 = 'INSERT INTO User SET ?';
        if (idComp = -1) {
            db.query(sql1, post, (db_err1, result1) => {
                if (db_err1) {
                    res.sendStatus(400).json({ message: db_err1 });
                } else {
                    console.log(result1);
                    console.log(result1.insertId);
                    if (companyname == null) {
                        post = { CompanyName: null, Description: null, Logo: null, HashTags: null, idUser: result1.insertId, Published: 0, EmailDomain: emailDomain[1] }
                    } else if (published == 1) {
                        post = { CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: result1.insertId, Published: published, EmailDomain: emailDomain[1] }
                    } else {
                        post = { CompanyName: companyname, Description: description, Logo: null, HashTags: null, idUser: result1.insertId, Published: published, EmailDomain: emailDomain[1] }
                    }
                    var sql2 = 'INSERT INTO Company SET ?'
                    db.query(sql2, post, (db_err2, result2) => {
                        console.log(result2);
                        if (db_err2) {
                            return res.status(400).json({ error: db_err2 });
                        }
                        else {
                            let sql3 = 'UPDATE User SET idCompany = \'' + result2.insertId + '\' WHERE idUser = \'' + result1.insertId + '\'';
                            db.query(sql3, (db_err3, result3) => {
                                if (db_err3) {
                                    return res.status(400).json({ error: db_err3 });
                                }
                                else {
                                    res.send(JSON.stringify({ "status": 200, "error": null, "response": result3 }));
                                    return res.status(200).json({ message: "Account Created" });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            db.query(sql1, post, (db_err4, result1) => {
                console.log(result1);
                if (db_err4) {
                    return res.status(400).json({ error: db_err4 });
                }
                else {
                    return res.status(200).json({ message: "Account created", });
                }
            });
        }
    });
});

// POST API: Delete Recruiter
app.post('/api/deleteRecruiter', verifyToken, (req, res) => {
    var fname = req.body.FirstName;
    var lname = req.body.LastName;
    var mname = req.body.MiddleName;
    var email = req.body.EmailID;
    let sql = 'DELETE FROM User WHERE EmailID = \'' + email + '\'';
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            return res.status(401).json({ error: auth_err });
        } else {
            db.query(sql, (db_err1, result) => {
                console.log(result);
                if (db_err1) {
                    return res.status(400).json({ error: db_err1 });
                }
                else {
                    return res.status(200).json({ message: "Success" });
                }
            })
        }
    });
});

// POST: Update Company Details
app.post('/api/updateCompanyDetails', verifyToken, (req, res) => {
    var token = req.token;
    var companyname = req.body.CompanyName;
    var description = req.body.Description;
    var logo = req.body.Logo;
    var hashTags = req.body.HashTags;
    var published = req.body.Published;
    var sql = 'SELECT idCompany FROM Company WHERE idUser = (SELECT idUser FROM User WHERE TokenID = \'' + token + '\')';
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            return res.status(401).json({ error: auth_err });
        } else {
            db.query(sql, (db_err1, result) => {
                console.log(result);
                if (db_err1) {
                    return res.status(400).json({ error: db_err1 });
                }
                else {
                    db.query(sql, (db_err2, result1) => {
                        if (db_err2) {
                            return res.status(400).json({ error: db_err2 });
                        } else {
                            sql = 'UPDATE Company SET CompanyName = \'' + companyname + '\', Description = \'' + description + '\', Logo = ' + logo + ', HashTags = \'' + hashTags + '\', Published = \'' + published + '\' WHERE idCompany = \'' + result1[0].idCompany + '\'';
                            db.query(sql, (db_err3, result) => {
                                if (db_err3) {
                                    return res.status(400).json({ error: db_err3 });
                                }
                                else {
                                    return res.status(200).json({ message: "Success" });
                                }
                            })
                        }
                    })
                }
            })
        }
    });
});

// POST API: Login Function - Using Token Based Authentication
app.post('/api/login', (req, res) => {
    var email = req.body.EmailID;
    var pass = req.body.Password;
    if (email === undefined || pass === undefined || email === "" || pass === "") {
        return res.status(401).json({ error: "Email ID or Password cannot be empty" });
    }
    let sql = 'SELECT Password FROM User WHERE EmailID = \'' + email + '\'';
    db.query(sql, (db_err1, result) => {
        if (db_err1) {
            return res.status(400).json({ error: db_err1 });
        }
        else {
            if (result.length === 0) {
                res.status(400).json({ error: "No Email Found" });
                return;
            }
            var hash = result[0].Password;
            bcrypt.compare(pass, hash, function (err, res2) {
                if (res2) {
                    // Passwords match
                    const user = {
                        EmailID: email,
                        Password: pass
                    };
                    jwt.sign({ user }, process.env.KEY, (auth_err, token) => {
                        if (auth_err) {
                            res.status(400).json({ error: auth_err });
                        }
                        else {
                            let sql2 = 'UPDATE User SET TokenID = \'' + token + '\' WHERE EmailID = \'' + email + '\'';
                            let sql3 = 'SELECT FirstName FROM User WHERE EmailID = \'' + email + '\'';
                            var fname = "";
                            db.query(sql3, (db_err2, result2) => {
                                if (db_err2) {
                                    res.status(400).json({ error: db_err2 });
                                }
                                else {
                                    fname = result2[0].FirstName;
                                }
                            });
                            db.query(sql2, (db_err3, result3) => {
                                if (db_err3) {
                                    res.status(400).json({ error: db_err3 });
                                }
                                else {
                                    return res.status(200).json({ message: "Success", token: token, FirstName: fname });
                                }
                            });
                        }
                    });
                } else {
                    // Passwords don't match
                    res.status(400).json({ response: "EmailID or Password Incorrect" });
                }
            });

        }
    });
});

// POST API: Logout User. Delete Token from DB
app.post('/api/logout', verifyToken, (req, res) => {
    //var cookies = cookie.parse(req.header.cookie);
    //jwt.verify(cookies.token, process.env.KEY, (err, authData) => {
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            return res.status(401).json({ message: "Forbidden", error: auth_err });
        } else {
            let sql = 'UPDATE User SET TokenID = ? WHERE TokenID = ?';
            let post = [null, req.token];
            db.query(sql, post, (db_err1, result) => {
                if (db_err1) {
                    return res.status(400).json({ error: db_err1 });
                }
                else {
                    return res.status(200).json({ message: "Success" });
                }
            });
        }
    });
});

// GET API: Retreive List of Majors
app.get('/api/getMajors', (req, res) => {
    let sql = 'SELECT * FROM Major';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        else {
            return res.status(200).json({ message: "Success", response: result });
        }
    });
});

// GET API: Retreive List of Degree Levels
app.get('/api/getDegrees', (req, res) => {
    let sql = 'SELECT * FROM Degree';
    db.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(400).json({ error: err });
        }
        else {
            return res.status(200).json({ message: "Success", response: result });
        }
    });
});

// GET API: Retreive List of Universities
app.get('/api/getUniversityList', (req, res) => {
    let sql = 'SELECT * FROM University';
    db.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(400).json({ message: err });
        }
        else {
            return res.status(200).json({ message: "Success", response: result });
        }
    });
});

// GET API: Retrive List of Company
app.get('/api/getCompanyList', (req, res) => {
    let sql = 'SELECT * FROM Company';
    db.query(sql, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(400).json({ error: err });
        }
        else {
            return res.status(200).json({ message: "Success", response: result });
        }
    });
});

// Multer Settings
app.use(express.static('./public'));
var email_string = '';
const storageR = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, email_string + "_Resume");
    }
});
const storageCV = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, email_string + '_CoverLetter');
    }
});
const uploadR = multer({
    storage: storageR,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('resume');
const uploadCL = multer({
    storage: storageCV,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('coverletter');
// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /pdf|jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: FilteType Not Supported!');
    }
}

// POST API: Uploads Resume in Server (public/uploads)
app.post('/api/uploadResume', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            res.sendStatus(401).json({ error: auth_err });
        } else {
            let sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
            db.query(sql, req.token, (err2, result) => {
                if (err2) {
                    return res.status(401).json({ error: err });
                }
                else {
                    email_string = result[0].EmailID;
                    uploadR(req, res, (err) => {
                        if (err) {
                            res.status(400).json({ error: err });
                        } else {
                            if (req.file == undefined) {
                                res.status(400).json({ error: err , message: "No File Selected"});
                            } else {
                                res.status(200).json({ message: "Success", response: req.file });
                            }
                        }
                    });
                }
            })
        }
    });
});

// POST API: Uploads CoverLetter in Server (public/uploads)
app.post('/api/uploadCoverLetter', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.KEY, (auth_err, authData) => {
        if (auth_err) {
            res.sendStatus(401).json({ error: auth_err });
        } else {
            let sql = 'SELECT EmailID FROM User WHERE TokenID = ?';
            db.query(sql, req.token, (err2, result) => {
                if (err2) {
                    return res.status(401).json({ error: err });
                }
                else {
                    email_string = 'public/uploads/' + result[0].EmailID;
                    uploadCV(req, res, (err) => {
                        if (err) {
                            res.status(400).json({ error: err });
                        } else {
                            if (req.file == undefined) {
                                res.status(400).json({ error: err , message: "No File Selected"});
                            } else {
                                res.status(200).json({ message: "Success", response: req.file });
                            }
                        }
                    });
                }
            })
        }
    });
});

// Verify Token [ Format -> Authorization: <access_token>]
function verifyToken(req, res, next) {

    console.log("TOKENNING");
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        req.token = bearerHeader;
        console.log("in token check");
    } else {
        // 403 Forbidden
        return res.sendFile(__dirname + '/Front-End/loginPage.html')
    }
}