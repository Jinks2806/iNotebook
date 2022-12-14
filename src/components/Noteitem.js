import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note} = props; //destructuring the prop (note) received from Notes.js
  return (
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i> {/*Deleting note of a particular id*/}
                <i className="far fa-edit mx-2"></i>
            </div>
        </div>
    </div>
  )
}

export default Noteitem