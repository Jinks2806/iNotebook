import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext);
  useEffect(()=>{
      a.update();
  }, [])
  return (
    <div>
        This is About {a.state.name} and he works in {a.state.company}
    </div>
  )
}

export default About