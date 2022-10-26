import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext); //using context API
    const {notes, setNotes, addNote, getNotes} = context;  //destructuring context to get notes and setNotes from it
    useEffect(() => {
      getNotes()
    }, [])
    
  return (
    <>
    <AddNote/>
    <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note)=>{
          return <Noteitem key={note._id} note={note}/> //passing each note as a prop to Noteitem 
        })}
    </div>
    </>
  )
}

export default Notes