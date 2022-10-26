import './App.css';
import { Home } from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  //imrr is the shortcut for BrowserRouter
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';

function App() {
  return (
    <>
      <NoteState> 
        <Router>
            <Navbar/>
            <Alert message="Hello this is a dummy message"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>}>
              </Route>
              <Route exact path="/about" element={<About/>}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
