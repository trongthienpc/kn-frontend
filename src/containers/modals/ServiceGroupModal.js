import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useRef, useState } from "react";
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
import { addServiceGroup } from "../../helpers/serviceGroupHelper";
import { FormikCustomRadioGroup } from "../forms/FormikFields";

const ServiceGroupModal = ({
  modalOpen,
  toggleModal,
  isEdit,
  object,
  axiosJWT,
}) => {
  console.log(object);

  const [group, setGroup] = useState(object);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const onUpdateService = (updateService) => {
    console.log(updateService);
  };

  const onAddService = async (group) => {
    await addServiceGroup(currentUser?.accessToken, dispatch, axiosJWT, group);
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
              label: "",
              status: true,
            }}
            validationSchema={Yup.object().shape({
              label: Yup.string().required("Vui lòng nhập tên nhóm dịch vụ"),
            })}
            onSubmit={(values) => {
              if (isEdit) {
                const updateGroup = {
                  id: group.id,
                  label: values.label,
                  status: values.status,
                };

                onUpdateService(updateGroup);
              } else {
                const newGroup = {
                  label: values["label"],
                };

                onAddService(newGroup);
              }

              setGroup(null);
              // toggleModal();
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
                    value={object?.label}
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
                  <Button color="secondary" type="submit">
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
