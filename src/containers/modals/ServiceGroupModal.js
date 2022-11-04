import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import {
  addServiceGroup,
  updateServiceGroup,
} from "../../helpers/serviceGroupHelper";
import { FormikCustomRadioGroup } from "../forms/FormikFields";

const ServiceGroupModal = ({
  modalOpen,
  toggleModal,
  isEdit,
  object,
  axiosJWT,
}) => {
  console.log(object);

  const [group, setGroup] = useState({});
  useEffect(() => {
    setGroup(object[0]);
  }, [object]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const onUpdateServiceGroup = async (g) => {
    await updateServiceGroup(currentUser?.accessToken, dispatch, axiosJWT, g);
    toggleModal();
  };

  const onAddServiceGroup = async (group) => {
    await addServiceGroup(currentUser?.accessToken, dispatch, axiosJWT, group);
  };

  const onCancelClick = () => {
    // setGroup({});
    toggleModal();
  };
  const options = [
    { value: true, label: "Kích hoạt" },
    { value: false, label: "Tạm dừng" },
  ];

  return (
    <>
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          {!!isEdit ? "Cập nhật nhóm dịch vụ" : "Thêm nhóm dịch vụ"}
        </ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={{
              label: isEdit ? group?.label : "",
              status: isEdit ? group?.status : true,
            }}
            validationSchema={Yup.object().shape({
              label: Yup.string().required("Vui lòng nhập tên nhóm dịch vụ"),
            })}
            onSubmit={(values) => {
              if (isEdit) {
                const updateGroup = {
                  id: object[0]?.id,
                  label: values.label,
                  status: values.status,
                };

                onUpdateServiceGroup(updateGroup);
              } else {
                const newGroup = {
                  label: values["label"],
                  status: values["status"],
                };

                onAddServiceGroup(newGroup);
              }
            }}
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-right">
                <FormGroup className="error-l-100">
                  <Label>Tên nhóm dịch vụ</Label>
                  <Field
                    className="form-control"
                    name="label"
                    id="label"
                    value={values?.label || ""}
                  />
                  {errors.label && touched.label && (
                    <div className="invalid-feedback d-block">
                      {errors.label}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="error-l-175">
                  <Label className="d-block">Trạng thái</Label>
                  <FormikCustomRadioGroup
                    inline
                    name="status"
                    id="status"
                    label="Trạng thái"
                    value={values.status}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    options={options}
                  />
                  {errors.status && touched.status ? (
                    <div className="invalid-feedback d-block">
                      {errors.status}
                    </div>
                  ) : null}
                </FormGroup>
                <div className="d-flex justify-content-between mt-5">
                  <Button
                    color="secondary"
                    type="submit"
                    onClick={onCancelClick}
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
      {/* <ToastContainer /> */}
    </>
  );
};

export default ServiceGroupModal;
