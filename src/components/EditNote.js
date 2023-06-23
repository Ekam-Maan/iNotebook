import React, { useRef, useContext, useState } from "react";
import noteContext from "../contexts/noteContext";


const EditNote = (props) => {
    const {note} = props;
    const closeButtonRef = useRef(null);
    const[newNote, setNewNote] = useState(note);
    const context = useContext(noteContext);
    const { editNote } = context;

    const handleSaveChanges = (e) =>{
        editNote(newNote._id, newNote.title, newNote.tag, newNote.description);
        closeButtonRef.current.click();
    }
    const handleValueChange = (e) => {
        setNewNote({...newNote,[e.target.name] : e.target.value})
    }


  return (
         <div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
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
                                                defaultValue={note.title}
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
                                                defaultValue={note.tag}
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
                                                defaultValue={note.description}
                                                onChange={handleValueChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/* do not pass any arugement to handleAddNote other it will run will mountin */}
                                    {/* s    */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
  };

export default EditNote
