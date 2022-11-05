import { Field, Form, Formik, useField, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
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
import { addKpi, updateKpi } from "../../helpers/kpiHelper";
import { FormikReactSelect } from "../forms/FormikFields";

const KpiModal = ({
  modalOpen,
  setModalOpen,
  axiosJWT,
  dispatch,
  isEdit,
  object,
  users,
}) => {
  console.log(users);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const [lstUsers, setLstUsers] = useState([]);
  const [kpi, setKpi] = useState({});

  useEffect(() => {
    const temp = users?.map((u) => {
      return { value: u.username, label: u.name };
    });
    console.log(temp);
    setLstUsers(temp);
    if (object) setKpi(object);
  }, []);

  useEffect(() => {
    setKpi(object);
  }, [object]);

  // add new kpi
  const onAddKpi = async (g) => {
    const entity = {
      userId: currentUser.id,
      username: g.user.value,
      name: g.user.label,
      month: g.month,
      year: g.year,
      target: g.target,
      status: g.status,
      createdBy: currentUser.name,
    };
    await addKpi(currentUser?.accessToken, dispatch, axiosJWT, entity);
  };

  // update old kpi
  const onUpdateKpi = async (g) => {
    console.log(modalOpen);
    const entity = {
      id: g.id,
      userId: g.userId,
      username: g.username,
      name: g.name,
      month: g.month,
      year: g.year,
      target: g.target,
      status: g.status,
      createdBy: currentUser.username,
    };
    await updateKpi(currentUser?.accessToken, dispatch, axiosJWT, entity);
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
        {!!isEdit ? "Cập nhật KPI" : "Thêm mới KPI"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={{
            user: {},
            month: !!isEdit ? kpi?.month || 0 : new Date().getMonth() + 1,
            year: !!isEdit ? kpi?.year || 0 : new Date().getFullYear(),
            target: !!isEdit ? kpi?.target || 0 : 10000000,
            status: !!isEdit ? kpi?.status : true,
          }}
          onSubmit={(values) => {
            console.log(values);
            if (isEdit) {
              const updateKpi = {
                id: kpi.id,
                user: values.user,
                month: values.month,
                year: values.year,
                target: values.target,
                status: values.status,
              };

              onUpdateKpi(updateKpi);
            } else {
              const newKpi = {
                user: values["user"],
                month: values["month"],
                year: values["year"],
                target: values["target"],
                status: values["status"],
              };

              onAddKpi(newKpi);
            }

            // setService(null);
            // toggleModal();
          }}
        >
          {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <FormGroup className="error-l-100">
                <Label>Hãy chọn nhân viên</Label>
                <FormikReactSelect
                  name="user"
                  id="user"
                  value={values?.user}
                  options={lstUsers}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                {errors.user && touched.user ? (
                  <div className="invalid-feedback d-block">{errors.user}</div>
                ) : null}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Hãy chọn tháng</Label>
                <InputGroup>
                  <Field
                    className="form-control"
                    name="month"
                    id="month"
                    type="number"
                    value={values?.month}
                  />
                </InputGroup>
                {errors.month && touched.month && (
                  <div className="invalid-feedback d-block">{errors.month}</div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Hãy chọn năm</Label>
                <InputGroup>
                  <Field
                    className="form-control"
                    name="year"
                    id="year"
                    type="number"
                    value={values?.year}
                  />
                </InputGroup>
                {errors.year && touched.year && (
                  <div className="invalid-feedback d-block">{errors.year}</div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Mục tiêu của tháng</Label>
                <InputGroup>
                  <Field
                    className="form-control"
                    name="target"
                    id="target"
                    type="number"
                    value={values?.target || 0}
                  />
                  <NumericFormat
                    value={values?.target || 0}
                    allowLeadingZeros={false}
                    thousandSeparator={true}
                    // name="discount"
                    className="form-control font-weight-bold"
                    onValueChange={(values) => {
                      const { value } = values;
                      setFieldValue("target", value);
                    }}
                  />
                </InputGroup>
                {errors.target && touched.target && (
                  <div className="invalid-feedback d-block">
                    {errors.target}
                  </div>
                )}
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

export default KpiModal;
