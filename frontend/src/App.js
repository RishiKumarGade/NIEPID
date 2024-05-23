import React from "react";
import Register from "./pages/Register";
import Test from "./pages/Test";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import StudentEval from "./pages/StudentEval";
import "react-toastify/dist/ReactToastify.css";
import Class from "./pages/Class";
import StudentHistory from "./pages/StudentHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/test" element={<Test />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/class" element={<Class />} />
        <Route exact path="/class" element={<Class />} />
        <Route  path="/eval/:username" element={<StudentEval />} />
        <Route  path="/hist/:username" element={<StudentHistory />} />

      </Routes>
    </BrowserRouter>
  );
}
