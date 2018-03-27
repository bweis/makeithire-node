/** *******************************
 *  MakeItHire Server
 ******************************** */

require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const api = require('./api/api');

const app = express();

const publicRoutes = [
  '/api/login',
  '/api/signupstudent',
  '/api/signuprecruiter',
  '/api/getcompanylist',
];

// Protect the /api routes with JWT
app.use('/api', expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: publicRoutes }));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Set app port
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
