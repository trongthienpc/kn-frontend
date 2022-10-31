import React from "react";
import Footer from "../containers/footer";
import Header from "../containers/header";

const AppLayout = ({ containerClassnames, children, history }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <Header history={history} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
