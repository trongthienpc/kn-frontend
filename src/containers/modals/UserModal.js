import { Field, Form, Formik, useField, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import { addUser, updateUser } from "../../helpers/userHelper";
// import { NumericFormat } from "react-number-format";

const UserModal = ({
  modalOpen,
  setModalOpen,
  axiosJWT,
  dispatch,
  isEdit,
  object,
}) => {
  const [user, setUser] = useState(object);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  useEffect(() => {
    setUser(object);
  }, [object]);
  // add new user
  const onAddUser = async (u) => {
    console.log(u);
    const entity = {
      username: u.username,
      fullName: u.fullName,
      password: u.password,
      status: u.status,
      createdBy: currentUser.name,
    };
    await addUser(currentUser?.accessToken, dispatch, axiosJWT, entity);
  };

  // update old user
  const onUpdateUser = async (u) => {
    console.log(modalOpen);
    const entity = {
      id: u.id,
      username: u.username,
      fullName: u.fullName,
      password: u.password,
      status: u.status,
      createdBy: currentUser.name,
    };
    await updateUser(currentUser?.accessToken, dispatch, axiosJWT, entity);
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={() => setModalOpen(!modalOpen)}
      wrapClassName="modal-right"
      backdrop="static"
      autoFocus={true}
    >
      <ModalHeader toggle={() => setModalOpen(false)}>
        {!!isEdit ? "Cập nhật người dùng" : "Thêm mới người dùng"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: !!isEdit ? user?.username || "" : "",
            fullName: !!isEdit ? user?.name || "" : "",
            password: !!isEdit ? user?.password || "" : "",
            password1: "",
            status: !!isEdit ? user?.status : true,
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .trim()
              .required("Vui lòng nhập mã nhân viên"),
            fullName: Yup.string()
              .trim()
              .required("Vui lòng nhập tên nhân viên"),
            password: Yup.string().trim().required("Vui lòng nhập mật khẩu"),
            password1: Yup.string()
              .trim()
              .required("Vui lòng nhập lại mật khẩu")
              .oneOf([Yup.ref("password"), null], "Mật khẩu phải giống nhau"),
          })}
          onSubmit={(values) => {
            console.log(values);
            if (isEdit) {
              const updateUser = {
                id: user.id,
                username: values.username,
                fullName: values.fullName,
                password: values.password,
                status: values.status,
              };

              onUpdateUser(updateUser);
            } else {
              const newUser = {
                username: values["username"],
                fullName: values["fullName"],
                password: values["password"],
                status: values["status"],
              };

              onAddUser(newUser);
            }

            // setService(null);
            // toggleModal();
          }}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-100">
                <Label>Mã nhân viên</Label>
                <Field
                  readOnly={isEdit ? true : false}
                  className="form-control"
                  name="username"
                  id="username"
                  type="text"
                  value={values?.username || ""}
                />
                {errors.username && touched.username && (
                  <div className="invalid-feedback d-block">
                    {errors.username}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Tên nhân viên</Label>
                <Field
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  type="text"
                  value={values?.fullName || ""}
                />
                {errors.fullName && touched.fullName && (
                  <div className="invalid-feedback d-block">
                    {errors.fullName}
                  </div>
                )}
              </FormGroup>
              {!isEdit && (
                <FormGroup className="error-l-100">
                  <Label>Mật khẩu</Label>
                  <Field
                    className="form-control"
                    name="password"
                    id="password"
                    type="password"
                    value={values?.password || ""}
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </FormGroup>
              )}
              {!isEdit && (
                <FormGroup className="error-l-100">
                  <Label>Nhập lại mật khẩu</Label>
                  <Field
                    className="form-control"
                    name="password1"
                    id="password1"
                    type="password"
                    value={values?.password1 || ""}
                  />
                  {errors.password1 && touched.password1 && (
                    <div className="invalid-feedback d-block">
                      {errors.password1}
                    </div>
                  )}
                </FormGroup>
              )}

              <div className="d-flex justify-content-between mt-5">
                <Button
                  color="secondary"
                  // type="submit"
                  onClick={() => setModalOpen(false)}
                >
                  Hủy
                </Button>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
