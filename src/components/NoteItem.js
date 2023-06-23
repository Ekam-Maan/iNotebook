import React, { useContext, useRef } from 'react'
import noteContext from '../contexts/noteContext';
import EditNote from './EditNote';

export default function NoteItem(props) {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const ref = useRef(null)

    const showEditWindow = () => {
        ref.current.click();
    }

    const handleDeleteNote = () => {
        if (window.confirm("Are you sure to delete the note?"))
            deleteNote(note._id);
        console.log("Delete button presses");
    }

   

    const handleEditNote = () => {
        showEditWindow();
        console.log("Edit button presses");
    }


    return (
        <div>

            <div>
                <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}>
                    Launch edit modal
                </button>
                <EditNote note={note}/>
                
            </div>

            <div className="card">
                <div className="card-header">
                    {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-around">
                        <i className="fa-solid fa-trash-can" onClick={handleDeleteNote}></i>
                        <i className="fa-solid fa-pen-to-square" onClick={handleEditNote}></i>

                    </div>

                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

