import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "./pages/blank";
import Dashboard from "./pages/dashboard";
import { Suspense, useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }, []);
  return (
    <div className="h-100">
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/blank" element={<Blank />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
