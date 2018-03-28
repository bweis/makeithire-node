// API Endpoints
const session = require('./session');
const registration = require('./registration');
const student = require('./student');
const recruiter = require('./recruiter')
const user = require('./user');
const data = require('./data');
const job = require('./job');
const admin = require('./admin');
const company = require('./company');

// Routers
const apiRouter = require('express').Router();

// Routes **To add public route, you must add it to the list in session.js**

// Session Routes
apiRouter.get('/ping', session.pingSession);
apiRouter.post('/login', session.login);

// Registration Routes
apiRouter.post('/signUpStudent', registration.signUpStudent);
apiRouter.post('/signUpRecruiter', registration.signUpRecruiter);

// User Routes

// Student Routes
apiRouter.get('/uploadResume', student.uploadResume);
apiRouter.get('/uploadCoverLetter', student.uploadCoverLetter);
apiRouter.get('/updateCompanyDetails', student.updateCompanyDetails);
apiRouter.get('/getStudentDetails', student.getStudentDetails);

// Recruiter Routes
apiRouter.post('/requestRecruiter', recruiter.requestRecruiter);
apiRouter.post('/getApplicants', recruiter.getApplicants);


// Company Routes

// Job Routes
apiRouter.get('/getAllJobs', job.getAllJobs);
apiRouter.post('/getJobDetails', job.getJobDetails);

// Application Routes

// Recruiter Routes

// Data Routes
apiRouter.get('/getMajors', data.getMajors);
apiRouter.get('/getDegrees', data.getDegrees);
apiRouter.get('/getUniversityList', data.getUniversityList);
apiRouter.get('/getCompanyList', data.getCompanyList);

// Admin Routes
apiRouter.post('/adminAddRecruiter', admin.adminAddRecruiter);


apiRouter.get('/getAllCompaniesWithJobs', company.getAllCompaniesWithJobs);
apiRouter.post('/getCompanyDetails', company.getCompanyDetails);





apiRouter.get('/getUserDetails', user.getUserDetails);





// apiRouter.post('/addJobPosting', job.addJobPosting);
// apiRouter.post('/editJobPosting', job.editJobPosting);

apiRouter.post('/adminAddRecruiter', admin.adminAddRecruiter);
apiRouter.post('/adminDeleteRecruiter', admin.adminDeleteRecruiter);

module.exports = apiRouter;
