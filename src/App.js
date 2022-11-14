import logo from "./logo.svg";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Blank from "./pages/blank";
import Dashboard from "./pages/dashboard";
import React, { Suspense, useEffect } from "react";
import Service from "./pages/service";
import Login from "./pages/user/login";
import { useSelector } from "react-redux";
import ServiceGroup from "./pages/serviceGroup";
import Transaction from "./pages/transaction";
import KPI from "./pages/kpi";

function RequireAuth({ children }) {
  let currentUser = useSelector((state) => state.auth?.currentUser);
  // console.log(currentUser);
  const location = useLocation();
  const from = location.pathname || "/";
  if (!currentUser?.accessToken)
    return <Navigate to="/login" state={{ from: from }} />;
  return children;
}

const LayoutContainer = React.lazy(() => import("./layout/AppLayout"));
const AppUser = React.lazy(() => import("./pages/user/user"));
const TestPage = React.lazy(() => import("./pages/test"));
const FormPage = React.lazy(() => import("./pages/form.js"));
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
                <LayoutContainer />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<Dashboard />} />
            <Route path="/services" element={<Service />} />
            <Route path="/serviceGroups" element={<ServiceGroup />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/kpis" element={<KPI />} />
            <Route path="/users" element={<AppUser />} />
            <Route path="/test" element={<FormPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
