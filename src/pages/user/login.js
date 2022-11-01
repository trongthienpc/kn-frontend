import React, { useState, useEffect, useRef } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import { loginHelper } from "../../helpers/authHelper";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateUsername = (value) => {
  let error;
  if (!value) {
    error = "Please enter your username";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from || "/test";

  const authSelector = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      authSelector &&
      authSelector?.currentUser &&
      authSelector?.currentUser?.accessToken
    )
      navigate(from);
  }, []);

  const onUserLogin = async (values) => {
    console.log(values);
    if (!authSelector?.loading) {
      if (values.username !== "" && values.password !== "") {
        loginHelper(values, dispatch, navigate, from);
      }
    }
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h4 mt-5">LONG TIME NO SEE</p>
            <p className="white mb-0 mt-5">
              Dùng mã nhân viên dể đăng nhập.
              <br />
              Nếu bạn chưa có hãy gọi Kiều Như nhé! .
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">LOGIN</CardTitle>

            <Formik
              enableReinitialize={true}
              initialValues={{
                username: "Your username",
                password: "Your password",
              }}
              onSubmit={(values) => {
                onUserLogin(values);
              }}
            >
              {({ errors, touched, handleSubmit, isSubmitting }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>Username</Label>
                    <Field
                      className="form-control"
                      name="username"
                      validate={validateUsername}
                    />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block">
                        {errors.username}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Password</Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      Forgot your password?
                    </NavLink>
                    <button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        authSelector?.loading ? "show-spinner" : ""
                      }`}
                      size="lg"
                      type="submit"
                      // disabled={isSubmitting}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Login</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
      <ToastContainer />
    </Row>
  );
};

export default Login;
