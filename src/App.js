import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Annonce from "./Components/Annonce/Annonce";
import Users from "./Components/Users/Users";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/annonce/:id" element={<Annonce />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
