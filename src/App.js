import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './contexts/noteState';
import NewNote from './components/NewNote';

function App() {
  return (
    <div className="App">
      <NoteState>
     <Router>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/newNote" element={<NewNote/>}/>
     </Routes>
     </Router>
     </NoteState>
    </div>
  );
}

export default App;
