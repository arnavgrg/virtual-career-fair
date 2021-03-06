/*  
    Routes:
        - GET/POST /applicant
        - GET/UPDATE/DELETE /applicant/:userid

    Base Endpoint Url: /applicant
*/

import express = require('express');
import { Applicant } from './applicant';
import { User } from '../user';
const ApplicantRouter = express.Router();
import { v4 as uuid } from 'uuid';

// Get All Applicants
ApplicantRouter.get("/", async (req, res) => {
    res.status(200).send(await Applicant.db.findMany({}));
});


// Create New Applicant
ApplicantRouter.post("/", async (req, res) => {
    //FIXME: Ensure id is string, FUTURE: make less hacky
    req.body._id = uuid();
    const successfulInsert = await Applicant.db.save(req.body);
    if (successfulInsert) {
        // Return token so that user is now 'logged in' as well
        const applicantObj = new Applicant(await Applicant.db.findOne({_id: req.body._id}));
        res.status(201).send(
            {
                token: applicantObj.getToken()
            });
    } 
    else {
        // Something failed in applicant creation, assume bad request
        res.sendStatus(400); 
    }
});

// Get Specific Applicant
ApplicantRouter.get("/:emailOrId", async (req, res) => {
    const filterQueryEmail = {
        email: req.params.emailOrId
    }

    const filterQueryId = {
        _id: req.params.emailOrId
    }

    const applicantByEmail = await Applicant.db.findOne(filterQueryEmail);
    const applicantById = await Applicant.db.findOne(filterQueryId);

    if(applicantByEmail != null) {
        res.status(200).send(applicantByEmail);
    }
    else if (applicantById != null)
    {
        res.status(200).send(applicantById);
    }
    // Did not find item in database
    else {
        res.sendStatus(404);
    }

});


// Update Specific Applicant
ApplicantRouter.put("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 0
    }
    
    // Make sure only one instance exists in the database
    if (await Applicant.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = {
        $set: req.body
    };

    // Return 200 to indicate successful put request
    if (await Applicant.db.updateOne(filterQuery, updateQuery)){
        res.sendStatus(204);
        return;
    } 
    // Update likely failed due to internal server error
    else {
        res.sendStatus(500);
        return;
    }
});


// Delete Specific User
ApplicantRouter.delete("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 0
    }

    // Make sure only one instance exists in the database
    if (await Applicant.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    if (await Applicant.db.deleteOne(filterQuery)) {
        res.sendStatus(204);
    }
    // Very likely that there is an internal server error
    else {
        res.sendStatus(500);
    }
});

export { ApplicantRouter };