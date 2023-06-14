const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const note = require("../models/Note");
const router = express.Router();

// ROUTE-1 Get request at '/api/notes/all-notes'to get all notes of a user (Login Required)
router.get("/all-notes", fetchUser, async (req, res) => {
    //get the notes of a user using the userID 
    const notes = await note.find({ userId: req.user.id });
    res.json({ notes });
});

//ROUTE-2 post request to 'api/notes/note' to create note in the database of a user (Login Required)
router.post(
    "/note",
    fetchUser,
    [
        body("title", "Title should be of atleast 2 chars").isLength({min: 2}),
        body("description", "Description should be of atleast 5 chars").isLength({min: 5}),
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        // getting the feild from the request body
        const { title, description, tag } = req.body;
        // create a new note in the database
        const notes = await note.create({
            userId: req.user.id,
            title: title,
            description: description,
            tag: tag,
        });
        res.send(notes);
    }
);

module.exports = router;
