import { Field, Form, Formik } from "formik";
import React from "react";
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
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikDatePicker,
  FormikReactSelect,
  FormikSwitch,
  FormikTagsInput,
} from "../forms/FormikFields";

const ModalGeneric = ({
  modalOpen,
  setModalOpen,
  axiosJWT,
  dispatch,
  isEdit,
  object,
  services,
  initialValues,
  validationSchema,
  onUpdateEntity,
  onAddEntity,
  fields,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={() => setModalOpen(!modalOpen)}
      wrapClassName="modal-right"
      backdrop="static"
      autoFocus={true}
    >
      <ModalHeader toggle={() => setModalOpen(false)}>
        {!!isEdit ? "Cập nhật giao dịch" : "Thêm mới giao dịch"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={fields.map((field) => {field?.name : field?.value})}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            if (isEdit) {
              const updateTransaction = {
                // id: transaction.id,
                // customerName: values.customerName,
                // service: values.service,
                // price: values.price,
                // quantity: values.quantity,
                // discount: values.discount,
                // cash: values.cash,
                // debt: values.debt,
                // transactionDate: values.transactionDate,
                // status: values.status,
              };

              onUpdateEntity(updateTransaction);
            } else {
              const newTransaction = {
                // customerName: values["customerName"],
                // service: values["service"],
                // price: values["price"],
                // quantity: values["quantity"],
                // discount: values["discount"],
                // cash: values["cash"],
                // debt: values["debt"],
                // transactionDate: values["transactionDate"],
                // status: values["status"],
              };

              onAddEntity(newTransaction);
            }

            // setService(null);
            // toggleModal();
          }}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              {fields?.map((field, index) => (
                <FormGroup className="error-l-100" key={index}>
                  <Label className="d-block">{field.label}</Label>
                  {field && field?.type === "text" && (
                    <Field
                      className="form-control"
                      name={field?.name}
                      id={field?.id}
                      type="text"
                      value={field?.value || ""}
                    />
                  )}
                  {field && field?.type === "select" && (
                    <FormikReactSelect
                      name={field?.name}
                      id={field?.id}
                      value={field?.value || null}
                      options={field?.options}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  )}
                  {field && field?.type === "checkboxSingle" && (
                    <FormikCustomCheckbox
                      name={field?.name}
                      id={field?.id}
                      value={field?.values}
                      label={field?.text}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  )}
                  {field && field?.type === "checkboxGroup" && (
                    <FormikCustomCheckboxGroup
                      inline
                      name={field?.name}
                      id={field?.id}
                      value={field?.value}
                      label={field?.text}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={field?.options}
                    />
                  )}
                  {field && field?.type === "radioGroup" && (
                    <FormikCustomRadioGroup
                      inline
                      name={field?.name}
                      id={field?.id}
                      value={field?.values}
                      label={field?.text}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={field?.options}
                    />
                  )}
                  {field && field?.type === "tags" && (
                    <FormikTagsInput
                      name={field?.name}
                      id={field?.id}
                      value={field?.values}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  )}
                  {field && field?.type === "date" && (
                    <FormikDatePicker
                      name={field?.name}
                      id={field?.id}
                      value={field?.values}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  )}

                  {field && field?.type === "switch" && (
                    <FormikSwitch
                      name={field?.name}
                      className="custom-switch custom-switch-primary"
                      value={field?.values}
                      label={field?.text}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  )}

                  {errors.customerName && touched.customerName && (
                    <div className="invalid-feedback d-block">
                      {errors.customerName}
                    </div>
                  )}
                </FormGroup>
              ))}

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

export default ModalGeneric;
