import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "./pages/blank";
import Dashboard from "./pages/dashboard";
import { Suspense, useEffect } from "react";
import Service from "./pages/service";
import Login from "./pages/user/login";
import UserLayout from "./layout/UserLayout";

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
            <Route path="/services" element={<Service />} />
          </Route>
          <Route path="/" element={<UserLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
