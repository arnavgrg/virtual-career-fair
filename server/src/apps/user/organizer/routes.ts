/*  
    Routes:
        - GET/POST /organizer
        - GET/UPDATE/DELETE /organizer/:userid

    Base Endpoint Url: /organizer
*/

import express = require('express');
import { Organizer } from './organizer';
const OrganizerRouter = express.Router();


// Create New Organizer
OrganizerRouter.post("/", async (req, res) => {
    if (await Organizer.db.save(req.body)) {
        // New Resource Created
        res.sendStatus(201);
    } else {
        res.sendStatus(400); 
    }
});


// Get All Organizers
OrganizerRouter.get("/", async (req, res) => {
    res.status(200).send(await Organizer.db.findMany({}));
});


// Get Specific Organizer
OrganizerRouter.get("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 2
    }
    var organizer = await Organizer.db.findOne(filterQuery);
    if(organizer != null) {
        res.status(200).send(organizer);
    }
    // Did not find item in database
    else {
        res.sendStatus(404);
    }
});


// Update Specific Organizer
OrganizerRouter.put("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 2
    }
    
    // Make sure only one instance exists in the database
    if (await Organizer.db.count(filterQuery) != 1) {
        res.sendStatus(404);
        return;
    }

    const updateQuery = {
        $set: req.body
    };

    // Return 200 to indicate successful put request
    if (await Organizer.db.updateOne(filterQuery, updateQuery)){
        res.sendStatus(204);
        return;
    } 
    // Update likely failed due to syntax error
    else {
        res.sendStatus(400);
        return;
    }
});


// Delete Specific User
OrganizerRouter.delete("/:userid", async (req, res) => {
    const filterQuery = {
        _id: req.params.userid,
        userType: 2
    }

    // Make sure only one instance exists in the database
    if (await Organizer.db.count(filterQuery) < 1) {
        res.sendStatus(404);
        return;
    }

    if (await Organizer.db.deleteOne(filterQuery)) {
        res.sendStatus(204);
    }
    // Very likely that there is an internal server error
    else {
        res.sendStatus(500);
    }
});

export { OrganizerRouter };