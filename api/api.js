// API Endpoints
const session = require('./session');
const registration = require('./registration');
const student = require('./student');
const recruiter = require('./recruiter');
const user = require('./user');
const data = require('./data');
const job = require('./job');
const admin = require('./admin');
const company = require('./company');
const application = require('./application');

// Routers
const apiRouter = require('express').Router();

// Routes **To add public route, you must add it to the list in session.js**

// Session Routes
apiRouter.get('/getSession', session.getSession);
apiRouter.post('/login', session.login);

// Registration Routes
apiRouter.post('/signUpStudent', registration.signUpStudent);
apiRouter.post('/signUpRecruiter', registration.signUpRecruiter);

// User Routes
apiRouter.get('/getUserDetails', user.getUserDetails);

// Student Routes
apiRouter.get('/uploadResume', student.uploadResume);
apiRouter.get('/uploadCoverLetter', student.uploadCoverLetter);
apiRouter.get('/getStudentDetails', student.getStudentDetails);

// Recruiter Routes
apiRouter.post('/requestRecruiter', recruiter.requestRecruiter);
apiRouter.get('/getRecruiters/:idCompany', recruiter.getRecruiters);

// Company Routes
apiRouter.get('/getAllCompaniesWithJobs', company.getAllCompaniesWithJobs);
apiRouter.get('/getCompanyDetails/:idCompany', company.getCompanyDetails);
apiRouter.post('/updateCompanyDetails', company.updateCompanyDetails);

// Job Routes
apiRouter.get('/getAllJobs', job.getAllJobs);
apiRouter.post('/getJobDetails', job.getJobDetails);
apiRouter.post('/addJobPosting', job.addJobPosting);
apiRouter.post('/editJobPosting', job.editJobPosting);

// Application Routes
apiRouter.post('/getApplicants', application.getApplicants);

// Data Routes
apiRouter.get('/getMajors', data.getMajors);
apiRouter.get('/getDegrees', data.getDegrees);
apiRouter.get('/getUniversityList', data.getUniversityList);
apiRouter.get('/getCompanyList', data.getCompanyList);

// Admin Routes
apiRouter.post('/adminAddRecruiter', admin.adminAddRecruiter);
apiRouter.post('/adminDeleteRecruiter', admin.adminDeleteRecruiter);

module.exports = apiRouter;
