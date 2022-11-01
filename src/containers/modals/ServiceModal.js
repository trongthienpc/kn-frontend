import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import AvailityBasic from "../forms/AvailityBasic";
import {
  FormikCustomRadioGroup,
  FormikRadioButtonGroup,
  FormikReactSelect,
} from "../forms/FormikFields";

const ServiceModal = ({ modalOpen, toggleModal, isEdit, serviceObject }) => {
  const [service, setService] = useState(serviceObject);
  const onUpdateService = (updateService) => {
    console.log(updateService);
  };
  const onAddService = (addService) => {
    console.log(addService);
  };

  const options = [
    { value: true, label: "Kích hoạt" },
    { value: false, label: "Tạm dừng" },
  ];

  const serviceGroup = [
    { value: "1", label: "Nhóm 1" },
    { value: "2", label: "Nhóm 2" },
    { value: "3", label: "Nhóm 3" },
  ];
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        {!!isEdit ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={{
            serviceName: "",
            serviceGroup: [{ value: "1", label: "Nhóm 1" }],
            status: false,
          }}
          validationSchema={Yup.object().shape({
            serviceName: Yup.string().required("Vui lòng nhập tên dịch vụ"),
          })}
          onSubmit={(values) => {
            if (isEdit) {
              const updateService = {
                id: service.id,
                serviceName: values.serviceName,
                serviceGroup: values.serviceGroup,
                status: values.status,
              };

              onUpdateService(updateService);
            } else {
              const newService = {
                serviceName: values["serviceName"],
                serviceGroup: values["serviceGroup"],
              };

              onAddService(newService);
            }

            setService(null);
            toggleModal();
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
                <Label>Select </Label>
                <select
                  name="select"
                  className="form-control"
                  value={values.select}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {serviceGroup?.map((g, index) => (
                    <option value={g.value} key={index}>
                      {g.label}
                    </option>
                  ))}
                </select>

                {errors.select && touched.select ? (
                  <div className="invalid-feedback d-block">
                    {errors.select}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Tên dịch vụ</Label>
                <Field
                  className="form-control"
                  name="serviceName"
                  id="serviceName"
                />
                {errors.serviceName && touched.serviceName && (
                  <div className="invalid-feedback d-block">
                    {errors.serviceName}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Nhóm dịch vụ </Label>
                <FormikReactSelect
                  name="serviceGroup"
                  id="serviceGroup"
                  value={values.serviceGroup}
                  options={serviceGroup}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.serviceGroup && touched.serviceGroup ? (
                  <div className="invalid-feedback d-block">
                    {errors.serviceGroup}
                  </div>
                ) : null}
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
  );
};

export default ServiceModal;
