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

function App() {
  return (
    <div className="App">
      <NoteState>
     <Router>
     <Navbar/>
     <h1>This is iNotebook</h1>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
     </Routes>
     </Router>
     </NoteState>
    </div>
  );
}

export default App;
