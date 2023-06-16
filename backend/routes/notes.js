const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const note = require("../models/Note");
const Note = require("../models/Note");
const router = express.Router();

// ROUTE-1 Get request at '/api/notes/all-notes'to get all notes of a user (Login Required)
router.get("/all-notes", fetchUser, async (req, res) => {
    //get the notes of a user using the userID
    const notes = await note.find({ userId: req.user.id });
    res.json({ notes });
});

//ROUTE-2 post request to 'api/notes/note' to create a new note in the database of a user (Login Required)
router.post(
    "/note",
    fetchUser,
    [
        body("title", "Title should be of atleast 2 chars").isLength({
            min: 2,
        }),
        body(
            "description",
            "Description should be of atleast 5 chars"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        // validate the values before entering in the database
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        // getting the feild from the request body
        const { title, description, tag } = req.body;
        try {
            
       
        // create a new note in the database
        const notes = await note.create({
            userId: req.user.id,
            title: title,
            description: description,
            tag: tag,
        });
        res.send(notes);
    }
        catch (error) {
            res.status(500).json({message: "Server Error Occured.", error:error.message });
        }
        
    }
);

//ROUTE-3 put request at 'api/notes/note/:id' to update an existing note (login required)
router.put("/note/:id", fetchUser, async (req, res) => {
    try {
        // find note from the database with the given ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found.");
        }

        // check if the user owns the the note to be updated
        if (note.userId.toString() !== req.user.id) {
            return res
                .status(401)
                .send("Suspicous activity detected. Access Denied.");
        }

        // get the feild to be updated from the request body
        const newNote = {};
        const { title, description, tag } = req.body;
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        
        // update the note in the database
        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json(note);
    } catch (error) {
        res.status(500).json({message: "Server Error Occured.", error:error.message });
    }
});

// ROUTE-4 DELETE request at '/api/notes/note/:id' to delete a note (Login required)
router.delete('/note/:id', fetchUser, async (req, res) => {
    try {
        // find note from the database with the given ID
        let note = await Note.findById(req.params.id);
        // check if the user owns the the note to be deleted
        if(note.userId.toString() !== req.user.id){
            return res
                .status(401)
                .send("Suspicous activity detected. Access Denied.");
        }
        // delete note
        await Note.findByIdAndDelete(req.params.id);
        res.send("Done")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error occurred");
    }
})




module.exports = router;
