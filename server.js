/** *******************************
 *  MakeItHire Server
 ******************************** */

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
// const api = require('./api/api');
const apiv2 = require('./api2/api');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up the API
// ============================================================================================
const publicRoutes = [
  '/api/login',
  '/api/signUpStudent',
  '/api/signUpRecruiter',
  '/api/getCompanyList',
  '/api/getMajors',
  '/api/getDegrees',
  '/api/getUniversityList',
];
// app.use('/api', expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: publicRoutes }));
app.use('/api', apiv2);


// Setting up the React Application
// ============================================================================================
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});


// Starting the App
// ============================================================================================
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
