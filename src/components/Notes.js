import React, { useContext, useEffect } from "react";

import noteContext from "../contexts/noteContext";
import NoteItem from "./NoteItem";


export default function Notes() {

    const contextNote = useContext(noteContext);
    const {notes, fetchAllNotes} = contextNote;
    
       // fetching all the notes from the database
    useEffect(()=>{
        console.log("Fetching......")
        fetchAllNotes();
    },[1])

    return (
        <div>
        <div className="container">
            <div className="row">
                {notes.map((note) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6 my-3">
                            {console.log("my id " + note._id)}
                            <NoteItem key={note._id} note={note}/>
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
}
