module.exports = app => {
    const meetings = require("..//controllers/meeting.controller.js");

    var router = require("express").Router();

    // Create new
    router.post("/", meetings.create);

    // Retrieve all
    router.get("/", meetings.findAll);

    // Retrieve all active
    router.get("/active", meetings.findAllActive);

    // Retrieve one by id
    router.get("/:id", meetings.findOne);

    // Update item with id
    router.put("/:id", meetings.update);

    // Delete item with id
    router.delete("/:id", meetings.delete);

    // Delete all
    router.delete("/", meetings.deleteAll);

    app.use('/api/meetings', router);

}