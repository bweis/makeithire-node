// To write all the apis related to functionality of jobs. E.g. get getJobDetails, getAllJobs, etc
const db = require('./utils/db');


function getAllJobs(req, res) {

    const sql = 'SELECT idJobs, CompanyName, JobName FROM Jobs INNER JOIN Company ON Jobs.idCompany = Company.idCompany';

    db.query(sql, (err, result) => {
        if(err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({ message: 'Success', response: result });
    })
}

function getCompanyJobs(req, res) {
    const sql = 'SELECT idJobs, CompanyName, JobName FROM Jobs INNER JOIN Company ON Jobs.idCompany = ?';

    db.query(sql, req.body.idCompany, (err, result) => {
        if(err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({ message: 'Success', response: result });
    })
}

function getJobDetails(req, res) {
    const idJobs = req.body.idJobs;
    const sql = 'SELECT * FROM Jobs WHERE idJobs = ' + idJobs;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({message: 'Success', response: result});
    })
}

function addJobPosting(req, res) {
    const jobName = req.body.JobName;
    const description = req.body.Description;
    const idCompany = req.body.idCompany;
    const deadline = req.body.Deadline;
    const tags = req.body.tags;
    const supplementalQs = req.body.SupplementalQs;
    const post = {
        JobName : jobName,
        Description : description,
        idCompany : idCompany,
        Deadline : deadline,
        Tags : tags,
        SupplementalQ : supplementalQs,
    };

    const sql = 'INSERT INTO Jobs SET ?';
    db.query(sql, post, (err, result) => {
        if (err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({message: 'Success', response: result})
    })
}

function editJobPosting(req, res) {
    const idJobs = req.body.idJobs;
    const jobName = req.body.JobName;
    const description = req.body.Description;
    const idCompany = req.body.idCompany;
    const deadline = req.body.Deadline;
    // const tags = ;
    const supplementalQs = req.body.supplementalQs;
    
    const post = {
        JobName : jobName,
        Description : description,
        idCompany : idCompany,
        Deadline : deadline,
        // tags : ,
        SupplementalQ : supplementalQs,
    };

    const sql = 'UPDATE Jobs VALUES SET ? WHERE idJobs = \'' + idJobs + '\'';

    db.query(sql, post, (err, result) => {
        if (err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({message: 'Success', response: result});
    })

}

module.exports = {
    getAllJobs,
    getJobDetails,
    addJobPosting,
    editJobPosting,
}