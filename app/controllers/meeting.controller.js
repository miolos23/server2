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
        capacity: req.body.capacity ? req.body.capacity : "",
        active: req.body.active ? req.body.active : false
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

// Retrieve all/find by title from the db
exports.findAll = (req, res) => {
    const title = req.query.title;
    var filteredByTitle = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Meeting.find(filteredByTitle)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving meetings"
            })
        })
}

// Find one by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Meeting.findById(id)
        .then(data => {
            if (!data)
                res.status(400).send({ message: "Not found specific event with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving meeting with id=" + id
            })
        })
}

// Find all active - find all object by condition
exports.findAllActive = (req, res) => {
    Meeting.find({ active: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving meetings"
            })
        })
}

// Update one by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }

    const id = req.params.id;

    Meeting.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update/not found meeting with id=${id}.`
                })
            } else res.send({ message: "Meeting was updated successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating meeting with id=" + id
            })
        })

}

// Delete one by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Meeting.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete/not found meeting with id=${id}.`
                })
            } else res.send({ message: "Meeting was deleted successfully." })
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Meeting with id=${id}.`
            })
        })
}

// Delete all from db
exports.deleteAll = (req, res) => {
    Meeting.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Meetings were deleted successfully.`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all meetings."
            })
        })
}
