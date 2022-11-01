import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";

const AddNewServiceModal = ({ modalOpen, toggleModal }) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <Label htmlFor="">Thêm mới</Label>
      </ModalHeader>
      <ModalBody>
        <Label>Tên dịch vụ</Label>
        <Input />
        <Label className="mt-4">Trạng thái</Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="ON HOLD"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="PROCESSED"
        />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-between">
        <Button color="secondary" outline onClick={toggleModal}>
          Hủy
        </Button>
        <Button color="primary" onClick={toggleModal}>
          Lưu
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewServiceModal;
