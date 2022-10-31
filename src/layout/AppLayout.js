import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../containers/footer";
import Header from "../containers/header";
import Sidebar from "../containers/sidebar";

const AppLayout = ({ history }) => {
  const menuSelector = useSelector((state) => state.menu);
  const containerClassnames = menuSelector?.containerClassnames;
  return (
    <div id="app-container" className={containerClassnames}>
      <Header history={history} />
      <Sidebar />
      <main>
        <div className="container-fluid">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
