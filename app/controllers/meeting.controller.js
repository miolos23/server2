const db = require("../models");
const Meeting = db.meetings;

// Create and save new item(event)
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }

    const meeting = new Meeting({
        title: req.body.title,
        capacity: "",
        active: "false"
    });

    meeting
        .save(meeting)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Meeting"
            })
        })
}

// Retrieve all from db
exports.findAll = (req, res) => {

}

// Find one by id
exports.findOne = (req, res) => {

}

// Find all active
exports.findAllActive = (req, res) => {

}

// Update one by id
exports.update = (req, res) => {

}

// Delete one by id
exports.delete = (req, res) => {

}

// Delete all from db
exports.deleteAll = (req, res) => {

}
