import React, { useContext, useState } from "react";
import noteContext from "../contexts/noteContext";

const NewNote = () => {

  const context = useContext(noteContext)
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})


   const handleAddNote = (event) =>{
    event.preventDefault();
    console.log("new note handled");
    addNote(note.title, note.description, note.tag);
    document.getElementById('form').reset();
    alert("Note Added Successfully.");
   }

   const handleValueChange = (e) =>{
    setNote({...note, [e.target.name]: e.target.value})
   }

  
    return (
      
        <div className="container">
          
            <h1>Add a New Note</h1>
            <form id='form'>
                <div className="mb-3 row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter Title"
                            onChange={handleValueChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="tag" className="col-sm-2 col-form-label">
                        Tag
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            placeholder="Enter a suitable tag"
                            onChange={handleValueChange}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label
                        htmlFor="description"
                        className="col-sm-2 col-form-label"
                    >
                        Description
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            onChange={handleValueChange}
                        ></textarea>
                    </div>
                </div>
                {/* do not pass any arugement to handleAddNote other it will run will mountin */}
                <button id="addButton" type="submit" className="btn btn-primary" onClick={handleAddNote}>
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default NewNote;
