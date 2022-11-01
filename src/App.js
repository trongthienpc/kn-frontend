import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Blank from "./pages/blank";
import Dashboard from "./pages/dashboard";
import { Suspense, useEffect } from "react";
import Service from "./pages/service";
import Login from "./pages/user/login";
import UserLayout from "./layout/UserLayout";
import { useSelector } from "react-redux";

function RequireAuth({ children }) {
  let currentUser = useSelector((state) => state.auth?.currentUser);
  console.log(currentUser);
  const location = useLocation();
  const from = location.pathname || "/home";
  if (!currentUser?.accessToken)
    return <Navigate to="/login" state={{ from: from }} />;
  return children;
}

function App() {
  useEffect(() => {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }, []);
  return (
    <div className="h-100">
      <Suspense fallback={<div className="loading" />}>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
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
