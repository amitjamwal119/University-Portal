import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/students" element={<Students/>} />
        <Route path="teachers" element={<Teachers/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App


// students , teachers , attandences , notices , profiles , logout