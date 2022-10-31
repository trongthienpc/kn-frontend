import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
    </Routes>
  );
}

export default App;
