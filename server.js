/** *******************************
 *  MakeItHire Server
 ******************************** */

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const api = require('./api/api');

const app = express();
const router = express.Router();

// Set up API
const publicRoutes = [
  '/api/login',
  '/api/signUpStudent',
  '/api/signUpRecruiter',
  '/api/getCompanyList',
  '/api/getMajors',
  '/api/getDegrees',
  '/api/getUniversityList',
];
app.use('/api', expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: publicRoutes }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the react app index
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
