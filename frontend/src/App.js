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
import AlertState from './contexts/alertState';
import NewNote from './components/NewNote';
import Login from './components/Login';
import Singup from './components/Singup';

function App() {
  return (
    <div className="App">
     <AlertState>
     <NoteState>
     <Router>
     <Navbar/>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/newNote" element={<NewNote/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/signup" element={<Singup/>}/>
     </Routes>
     </Router>
     </NoteState>
     </AlertState>

    </div>
  );
}

export default App;
