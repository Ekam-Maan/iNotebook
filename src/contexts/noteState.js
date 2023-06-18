import { useState } from "react";

import noteContext from "./noteContext";

const NoteState = (props) =>{
    const intialState = {
        title: "Title1",
        description: "MyDescription"
    }

    const[state, setState] = useState(intialState);

    const update = () =>{
        setTimeout( () => { setState({
            title: "new Title",
            description: "New Description"
        })},2000);
    
    }

    return(
        <noteContext.Provider value = {{state, update}}>
            {props.children}
        </noteContext.Provider>
    )   
}

export default NoteState;
