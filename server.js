/** *******************************
 *  MakeItHire Server
 ******************************** */

require('dotenv/config');
//require('socket.io')(app);
const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
// const chat = require('./api/chat');
const api = require('./api/api');

const app = express();

const publicRoutes = [
  '/api/login',
  '/api/signUpStudent',
  '/api/signUpRecruiter',
  '/api/getCompanyList',
  '/api/getMajors',
  '/api/getDegrees',
  '/api/getUniversityList',
];

// Protect the /api routes with JWT
app.use('/api', expressJwt({ secret: process.env.JWT_SECRET }).unless({ path: publicRoutes }));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});

// var io = require('socket.io').listen(app.get('port'));
// io.on('connection', chat.onConnect);