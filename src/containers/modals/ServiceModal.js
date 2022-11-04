import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { addService, updateService } from "../../helpers/serviceHelper";
import AvailityBasic from "../forms/AvailityBasic";
import {
  FormikCustomRadioGroup,
  FormikRadioButtonGroup,
  FormikReactSelect,
} from "../forms/FormikFields";

const ServiceModal = ({
  modalOpen,
  toggleModal,
  axiosJWT,
  dispatch,
  isEdit,
  object,
  groups,
}) => {
  const [service, setService] = useState(object);
  // const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const onUpdateService = async (g) => {
    const group = {
      id: g.id,
      serviceName: g.serviceName,
      price: g.price,
      status: g.status,
      serviceGroupId: g.serviceGroup?.id,
      serviceGroupName: g.serviceGroup?.label,
    };
    await updateService(currentUser?.accessToken, dispatch, axiosJWT, group);

    console.log(g);
    toggleModal();
  };

  const onAddService = async (g) => {
    const group = {
      serviceName: g.serviceName,
      price: g.price,
      status: g.status,
      serviceGroupId: g.serviceGroup?.id,
      serviceGroupName: g.serviceGroup?.label,
    };
    console.log(group);
    await addService(currentUser?.accessToken, dispatch, axiosJWT, group);
  };

  const onCancelClick = () => {
    toggleModal(false);
  };

  const options = [
    { value: true, label: "Kích hoạt" },
    { value: false, label: "Tạm dừng" },
  ];
  useEffect(() => {
    setService(object[0]);
  }, [object]);

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
            serviceName: !!isEdit ? service?.serviceName : "",
            serviceGroup: !!isEdit
              ? {
                  value: service?.serviceGroupId,
                  label: service?.serviceGroupName,
                }
              : groups[0],
            price: !!isEdit ? service?.price : 0,
            status: !!isEdit ? service?.status : true,
          }}
          validationSchema={Yup.object().shape({
            serviceName: Yup.string().required("Vui lòng nhập tên dịch vụ"),
            serviceGroup: Yup.object().required(
              "Vui lòng nhập chọn nhóm dịch vụ"
            ),
          })}
          onSubmit={(values) => {
            if (isEdit) {
              console.log(values);

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
                price: values["price"],
                status: values["status"],
              };

              onAddService(newService);
            }

            // setService(null);
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
              {/* <FormGroup className="error-l-100">
                <Label>Select </Label>
                <select
                  name="select"
                  className="form-control"
                  value={values.select}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {groups?.map((g, index) => (
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
              </FormGroup> */}
              <FormGroup className="error-l-100">
                <Label>Tên dịch vụ</Label>
                <Field
                  className="form-control"
                  name="serviceName"
                  id="serviceName"
                  value={values.serviceName || ""}
                />
                {errors.serviceName && touched.serviceName && (
                  <div className="invalid-feedback d-block">
                    {errors.serviceName}
                  </div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Giá dịch vụ</Label>
                <Field
                  className="form-control"
                  name="price"
                  id="price"
                  type="number"
                  value={values?.price || 0}
                />
                {errors.price && touched.price && (
                  <div className="invalid-feedback d-block">{errors.price}</div>
                )}
              </FormGroup>
              <FormGroup className="error-l-100">
                <Label>Nhóm dịch vụ </Label>
                <FormikReactSelect
                  name="serviceGroup"
                  id="serviceGroup"
                  value={values.serviceGroup || null}
                  options={groups}
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
                <Button color="secondary" type="submit" onClick={onCancelClick}>
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
