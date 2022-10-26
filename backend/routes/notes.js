const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator');


//ROUTE1: Get all the notes using: GET "/api/notes/getuser" . Login required
router.get('/fetchallnotes', fetchuser, async (req,res)=>{ //req: request, res: response
    try {
        const notes = await  Note.find({user: req.user.id});
        res.json(notes)    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error") 
    }
    
})

//ROUTE 2: Add a new note using: POST "/api/notes" . Login required
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Dexcription must be atleast 5 characters').isLength({min: 5}),
], async (req,res)=>{ //req: request, res: response
        try {
            const {title, description, tag} = req.body; 
            //If there are errors, return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } 
            const note = new Note({
                    title, description, tag, user: req.user.id
            })
                const savedNote = await note.save()
                res.json(savedNote)    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error") 
        }
        
})


//ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote" . Login required, we'll take id of a note to update it
router.put('/updatenote/:id', fetchuser, async (req,res)=>{ //req: request, res: response
    const{title, description, tag} = req.body;
    //create a new Note object
    const newNote = {};
    if(title){newNote.title = title}; //if title is a part of edit note then update title
    if(description){newNote.description = description};
    if(title){newNote.tag = tag};


    //We'll make sure only the person can update his/her note only and not someone else's notes
    //Find the note to be updated and update it
    let note = await Note.findById(req.params.id); //argument of findById is an id, req.params.id is same id as in the url(/updatenote/:id)
    if(!note){return res.status(404).send("Not found")} //if such note doesn't exist 
    //checking if note belongs to user:
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) //updating syntax
    res.json({note});

   })

   //(Route 4 is kinda a replica of route 3)
   //ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote" . Login required, we'll take id of a note to update it
    router.delete('/deletenote/:id', fetchuser, async (req,res)=>{ //req: request, res: response
    //We'll make sure only the person can update his/her note only and not someone else's notes
    //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id); //argument of findById is an id, req.params.id is same id as in the url(/updatenote/:id)
    if(!note){return res.status(404).send("Not found")} //if such note doesn't exist 
    
    //Allow deletion only if user owns this Note:
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id) //deleting syntax takes id of note to be deleted
    res.json({"Success":"note has been deleted"});

   })

module.exports = router