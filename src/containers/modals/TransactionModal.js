import { Field, Form, Formik, useField, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import {
  Button,
  FormGroup,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import {
  addTransaction,
  updateTransaction,
} from "../../helpers/transactionHelper";
// import { NumericFormat } from "react-number-format";
import {
  FormikCustomRadioGroup,
  FormikDatePicker,
  FormikReactSelect,
} from "../forms/FormikFields";

const options = [
  { value: true, label: "Kích hoạt" },
  { value: false, label: "Tạm dừng" },
];

const TransactionModal = ({
  modalOpen,
  setModalOpen,
  axiosJWT,
  dispatch,
  isEdit,
  object,
  services,
}) => {
  // custom price field
  const PriceField = (props) => {
    const {
      values: { service },
      touched,
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    React.useEffect(() => {
      // set the value of textC, based on textA and textB
      if (service?.value !== null && touched.service && modalOpen) {
        const s = services.filter((s) => s.id === service.value);
        // console.log(service);
        setFieldValue(props.name, s[0]?.price || 0);
      }
    }, [service, touched.service, props.name, setFieldValue]);

    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
  };

  // custom debt field
  const DebtField = (props) => {
    const {
      values: { price, quantity, discount, cash },
      touched,
      setFieldValue,
    } = useFormikContext();

    const [field, meta] = useField(props);
    React.useEffect(() => {
      if (price > 0) {
        setFieldValue(props.name, price * quantity - discount - cash);
      }
    }, [
      price,
      discount,
      cash,
      quantity,
      touched.quantity,
      touched.price,
      touched.discount,
      touched.cash,
      props.name,
      setFieldValue,
    ]);
    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
  };

  const [lstService, setLstService] = useState([]);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [transaction, setTransaction] = useState(object);
  const autoFocusRef = useRef();

  useEffect(() => {
    const temp = services.map((s) => {
      return { value: s.id, label: s.serviceName };
    });
    setLstService(temp);
    if (object) setTransaction(object);
  }, []);

  useEffect(() => {
    setTransaction(object);
  }, [object]);

  useEffect(() => {
    if (autoFocusRef.current) autoFocusRef.current.focus();
  }, [autoFocusRef]);

  // add new transaction
  const onAddTransaction = async (g) => {
    const entity = {
      serviceId: g.service?.value,
      serviceName: g.service?.label,
      price: g.price,
      quantity: g.quantity,
      discount: g.discount,
      cash: g.cash,
      debt: g.debt,
      transactionDate: new Date(g.transactionDate),
      userId: currentUser.id,
      username: currentUser.username,
      fullName: currentUser.name,
      customerName: g.customerName,
      status: g.status,
      createdBy: currentUser.username,
    };
    await addTransaction(currentUser?.accessToken, dispatch, axiosJWT, entity);
  };

  // handle service change event
  const handleServiceChange = (e) => {
    console.log(e);
  };

  // update old transaction
  const onUpdateTransaction = async (g) => {
    console.log(modalOpen);
    const entity = {
      id: g.id,
      serviceId: g.service?.value,
      serviceName: g.service?.label,
      price: g.price,
      quantity: g.quantity,
      discount: g.discount,
      cash: g.cash,
      debt: g.debt,
      transactionDate: new Date(g.transactionDate),
      userId: currentUser.id,
      username: currentUser.username,
      fullName: currentUser.name,
      customerName: g.customerName,
      status: g.status,
      createdBy: currentUser.username,
    };
    await updateTransaction(
      currentUser?.accessToken,
      dispatch,
      axiosJWT,
      entity
    );
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
        {!!isEdit ? "Cập nhật giao dịch" : "Thêm mới giao dịch"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={{
            customerName: !!isEdit ? transaction?.customerName || "" : "",
            service: !!isEdit
              ? {
                  value: transaction?.serviceId,
                  label: transaction.serviceName,
                }
              : {},
            price: !!isEdit ? transaction?.price || 0 : 0,
            quantity: !!isEdit ? transaction?.quantity || 0 : 0,
            discount: !!isEdit ? transaction?.discount || 0 : 0,
            cash: !!isEdit ? transaction?.cash || 0 : 0,
            debt: !!isEdit ? transaction?.debt || 0 : 0,
            transactionDate: !!isEdit
              ? new Date(transaction?.transactionDate).getTime()
              : Date.now(),
            status: !!isEdit ? transaction?.status : true,
          }}
          validationSchema={Yup.object().shape({
            customerName: Yup.string().required("Vui lòng nhập tên khách hàng"),
            quantity: Yup.number().required(
              "Vui lòng nhập số lượng của dịch vụ"
            ),
            discount: Yup.number().required("Vui lòng nhập số tiền được giảm"),
            debt: Yup.number().required("Vui lòng nhập số tiền còn thiếu lại"),
          })}
          onSubmit={(values) => {
            console.log(values);
            if (isEdit) {
              const updateTransaction = {
                id: transaction.id,
                customerName: values.customerName,
                service: values.service,
                price: values.price,
                quantity: values.quantity,
                discount: values.discount,
                cash: values.cash,
                debt: values.debt,
                transactionDate: values.transactionDate,
                status: values.status,
              };

              onUpdateTransaction(updateTransaction);
            } else {
              const newTransaction = {
                customerName: values["customerName"],
                service: values["service"],
                price: values["price"],
                quantity: values["quantity"],
                discount: values["discount"],
                cash: values["cash"],
                debt: values["debt"],
                transactionDate: values["transactionDate"],
                status: values["status"],
              };

              onAddTransaction(newTransaction);
            }

            // setService(null);
            // toggleModal();
          }}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-100">
                <Label>Tên khách hàng</Label>
                <Field
                  className="form-control"
                  name="customerName"
                  id="customerName"
                  type="text"
                  value={values?.customerName || ""}
                  innerRef={autoFocusRef}
                />
                {errors.customerName && touched.customerName && (
                  <div className="invalid-feedback d-block">
                    {errors.customerName}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Chọn dịch vụ</Label>
                <FormikReactSelect
                  name="service"
                  id="service"
                  value={values?.service || null}
                  options={lstService}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.service && touched.service ? (
                  <div className="invalid-feedback d-block">
                    {errors.service}
                  </div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Giá dịch vụ</Label>
                <InputGroup>
                  <PriceField
                    className="form-control"
                    name="price"
                    id="price"
                    type="number"
                    value={values?.price || 0}
                    onChange={setFieldValue}
                  />
                  <NumericFormat
                    readOnly
                    value={values?.price || 0}
                    allowLeadingZeros={false}
                    thousandSeparator={true}
                    // name="discount"
                    className="form-control font-weight-bold"
                    onValueChange={(values) => {
                      const { value } = values;
                      setFieldValue("price", value);
                    }}
                  />
                </InputGroup>
                {errors.price && touched.price && (
                  <div className="invalid-feedback d-block">{errors.price}</div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Số lượng</Label>
                <Field
                  className="form-control"
                  name="quantity"
                  id="quantity"
                  type="number"
                  value={values?.quantity || 0}
                />
                {errors.quantity && touched.quantity && (
                  <div className="invalid-feedback d-block">
                    {errors.quantity}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Giảm giá</Label>

                <InputGroup>
                  <Field
                    className="form-control"
                    name="discount"
                    id="discount"
                    type="number"
                    value={values?.discount || 0}
                  />
                  <NumericFormat
                    readOnly
                    value={values?.discount || 0}
                    allowLeadingZeros={false}
                    thousandSeparator={true}
                    // name="discount"
                    className="form-control font-weight-bold"
                    onValueChange={(values) => {
                      const { value } = values;
                      setFieldValue("discount", value);
                    }}
                  />
                </InputGroup>
                {errors.discount && touched.discount && (
                  <div className="invalid-feedback d-block">
                    {errors.discount}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Tiền mặt</Label>
                <InputGroup>
                  <Field
                    className="form-control"
                    name="cash"
                    id="cash"
                    type="number"
                    value={values?.cash || 0}
                  />
                  <NumericFormat
                    readOnly
                    value={values?.cash || 0}
                    allowLeadingZeros={false}
                    thousandSeparator={true}
                    // name="debt"
                    className="form-control font-weight-bold"
                    onValueChange={(values) => {
                      const { value } = values;
                      setFieldValue("cash", value);
                    }}
                  />
                </InputGroup>
                {errors.cash && touched.cash && (
                  <div className="invalid-feedback d-block">{errors.cash}</div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Thiếu lại</Label>
                <InputGroup>
                  {/* <Field
                    className="form-control"
                    name="debt"
                    id="debt"
                    type="number"
                    value={values?.debt || 0}
                  /> */}
                  <DebtField className="form-control" name="debt" />
                  <NumericFormat
                    readOnly
                    value={values?.debt || 0}
                    allowLeadingZeros
                    thousandSeparator={true}
                    // name="debt"
                    className="form-control font-weight-bold"
                    onValueChange={(values) => {
                      const { value } = values;
                      setFieldValue("debt", value);
                    }}
                  />
                  {errors.debt && touched.debt && (
                    <div className="invalid-feedback d-block">
                      {errors.debt}
                    </div>
                  )}
                </InputGroup>
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label className="d-block">Ngày giao dịch</Label>
                <FormikDatePicker
                  name="transactionDate"
                  value={values.transactionDate}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.transactionDate && touched.transactionDate ? (
                  <div className="invalid-feedback d-block">
                    {errors.transactionDate}
                  </div>
                ) : null}
              </FormGroup>
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

export default TransactionModal;
