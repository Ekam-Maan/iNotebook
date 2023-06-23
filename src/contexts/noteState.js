import { useEffect, useState } from "react";

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
               "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OTQwYTljZmEyNzQ1YzI0MjNjOGMxIn0sImlhdCI6MTY4NjcxNjU4NX0._-0cHorwLtgVNOKizEORN5_YI2Q0sEUJ3LFgLXJ3aDU"
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
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OTQwYTljZmEyNzQ1YzI0MjNjOGMxIn0sImlhdCI6MTY4NjcxNjU4NX0._-0cHorwLtgVNOKizEORN5_YI2Q0sEUJ3LFgLXJ3aDU"
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({"title": title, "description": description, "tag": tag}), // body data type must match "Content-Type" header
          });

          const mynote = await response.json();
          console.log("My  note " + mynote);

       const note = {
            "_id": "648b7d012658ca2aff9ffb8b",
            "userId": "648940a9cfa2745c2423c8c1",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-06-15T21:05:05.949Z",
            "__v": 0
          };
        setNotes(notes.concat(note));
    }
    const deleteNote = async (id) =>{
            //API call
            const url = host + "/api/notes/note/" + id;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OTQwYTljZmEyNzQ1YzI0MjNjOGMxIn0sImlhdCI6MTY4NjcxNjU4NX0._-0cHorwLtgVNOKizEORN5_YI2Q0sEUJ3LFgLXJ3aDU"
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
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4OTQwYTljZmEyNzQ1YzI0MjNjOGMxIn0sImlhdCI6MTY4NjcxNjU4NX0._-0cHorwLtgVNOKizEORN5_YI2Q0sEUJ3LFgLXJ3aDU"
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
