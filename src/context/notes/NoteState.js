//will contain states for Notes
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    // const s1 = {  
    //     "name": "Ajinkya",
    //     "company": "IVP"
    // }
    // //now we'll update the state using setState
    // const [state, setState] = useState(s1); //default value of this state variable named 'state' is s1 object
    // const update = () =>{ //update is a function which will change the state, name and company to something else after 5 seconds
    //     setTimeout(() => {
    //         setState({
    //             "name": "Ajinkya Kirkire",
    //             "company": "Indus Valley Partners"
    //         })
    //     }, 5000);
    // }
    // const notesInitial = [ //currently hardcoding the notes
    //     {
    //         "_id": "61322f19553781a8ca8d0e06",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title",
    //         "description": "This is my note description",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.509Z",
    //         "__v":0
    //     },
    //     {
    //         "_id": "61322f19553781a8ca8d0e08",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title 2",
    //         "description": "This is my note description 2",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.668Z",
    //         "__v":0
    //     },
    //     {
    //         "_id": "61322f19553781a8ca8d0e061",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title",
    //         "description": "This is my note description",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.509Z",
    //         "__v":0
    //     },
    //     {
    //         "_id": "61322f19553781a8ca8d0e062",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title",
    //         "description": "This is my note description",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.509Z",
    //         "__v":0
    //     },
    //     {
    //         "_id": "61322f19553781a8ca8d0e063",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title",
    //         "description": "This is my note description",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.509Z",
    //         "__v":0
    //     },
    //     {
    //         "_id": "61322f19553781a8ca8d0e064",
    //         "user": "6131dc5e3e4037cd4734a066",
    //         "title": "My Title",
    //         "description": "This is my note description",
    //         "tag": "personal",
    //         "date": "2022-10-20T14:20:09.509Z",
    //         "__v":0
    //     }
    // ]
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get All Notes (Fetching Notes)
    const getNotes = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                "auth-token":""
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }    

    //Add a Note 
    const addNote = async (title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "auth-token":""
            },
            body: JSON.stringify({title, description, tag})
        });
        const json =  response.json();
        const note = {
            "_id": "61322f19553781a8ca8d0e064",
            "user": "6131dc5e3e4037cd4734a066",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-10-20T14:20:09.509Z",
            "__v":0
        }
        setNotes(notes.concat(note)) //adding a new note
    }
    //Delete a Note
    const deleteNote = (id)=>{
        console.log("Deleting note with id "+id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    //Edit a Note
    const editNote = async (id, title, description, tag)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                "auth-token":""
            },
            body: JSON.stringify({title, description, tag})
        });
        const json =  response.json();
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id==id){
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return( //previous commented content written in google docs, pls refer for better understanding
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    ) 
}
export default NoteState;