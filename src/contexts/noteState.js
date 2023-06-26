import {useState } from "react";

import noteContext from "./noteContext";

const NoteState = (props) =>{
    const host = "http://localhost:5000";
    const intialNotes = [];
    const [notes, setNotes] = useState(intialNotes);

 

    const fetchAllNotes = async () =>{
         //API call
         const url = host + "/api/notes/all-notes";
         const response = await fetch(url, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "auth-token": localStorage.getItem('authToken')
             }
          });
        const notes = await response.json(); // parses JSON response into native JavaScript objects
        setNotes(notes.notes)
        console.log("Yours Notes " + notes.notes);
    }

    const addNote = async (title, description, tag) =>{
        //API call
        const url = host + "/api/notes/note";
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('authToken')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"title": title, "description": description, "tag": tag}), // body data type must match "Content-Type" header
          });

          const mynote = await response.json();
          console.log("My  note str " + mynote);
          console.log(mynote);
          setNotes(notes.concat(mynote));
    }
    const deleteNote = async (id) =>{
            //API call
            const url = host + "/api/notes/note/" + id;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem('authToken')
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                } });
        const updatedNotes = notes.filter((note)=>{ return note._id !== id});
        setNotes(updatedNotes);
    }
    const editNote = async (id, title, tag, description) =>{
        
        //API call
        const url = host + "/api/notes/note/" + id;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('authToken')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"title": title, "description": description, "tag": tag}), // body data type must match "Content-Type" header
          });
        
          //changing note on the cliet side
        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            if(note._id == id){
                notes[index].title = title;
                notes[index].tag = tag;
                notes[index].description = description;
            }
        }
        const newNotes = JSON.parse(JSON.stringify(notes));
        setNotes(newNotes);
        console.log(newNotes);
    }

    // const update = () =>{
    //     setTimeout( () => { setState({
    //         title: "new Title",
    //         description: "New Description"
    //     })},2000);
    
    // }

    return(
        <noteContext.Provider value = {{notes, addNote, deleteNote, editNote, fetchAllNotes}}>
            {props.children}
        </noteContext.Provider>
    )   
}

export default NoteState;
