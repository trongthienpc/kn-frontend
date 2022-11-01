import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  useEffect(() => {
    document.body.classList.add("background");
    document.body.classList.add("no-footer");

    return () => {
      document.body.classList.remove("background");
      document.body.classList.remove("no-footer");
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default UserLayout;
