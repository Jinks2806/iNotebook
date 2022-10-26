import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description:"", tag: "default"})  //note is a state var, with title, description and tag initially blank
  const handleClick = (e) =>{
        e.preventDefault(); //prevent refreshing of page
        addNote(note.title, note.description,note.tag); 
  }
  const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value}) //spread syntax, jo bhi change horha h uska name uski value k barabr ho jaaye
  }
  return (
    <div>
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote