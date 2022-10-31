import React from "react";
import { NavLink } from "react-router-dom";
import { Row } from "reactstrap";
import { Colxx } from "../components/common/CustomBootstrap";

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted">Kieu Nhu 2022</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <p className="breadcrumb pt-0 pr-0 float-right text-muted">
                {" "}
                This is a gift to my friend!
              </p>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
