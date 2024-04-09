import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import Header from "./components/header"
import Imagegeneration from "./components/Imagegeneration"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = { <Login/>}/>
          <Route path = "/signup" element = { <Signup/>}/>
          <Route path = "/chatbot" element = { <Chatbot/>}/>
          <Route path = "/home" element = { <Home/>}/>
          <Route path = "/imagegeneration" element = { <Imagegeneration/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
