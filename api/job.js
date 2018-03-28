// To write all the apis related to functionality of jobs. E.g. get getJobDetails, getAllJobs, etc

function getAllJobs(req, res) {
    
    const sql = 'SELECT idJobs, CompanyName, , JobName FROM Jobs j JOIN Company c ON j.idCompany = c.idCompany';

    db.query(sql, (err, result) => {
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
    const sql = 'SELECT * FROM JOBS WHEER idJobs = '
    db.query(sql, idJobs, (err, result) => {
        if (err) {
            return res.status(400)
                .json({error: err});
        }
        return res.status(200)
            .json({message: 'Success', response: result});
    })
}

function addJobPosition(req, res) {
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

function editJobPosition(req, res) {
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