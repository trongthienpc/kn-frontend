import React, { useState } from "react";
import {
  Button,
  Row,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Colxx, Separator } from "./CustomBootstrap";

const ListPageHeading = ({
  heading,
  toggleModal,
  onSearchKey,
  totalItemCount,
  selectedPageSize,
  changePageSize,
  pageSizes,
  setIsEdit,
}) => {
  console.log(totalItemCount);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const handleAddButton = () => {
    setIsEdit(false);
    toggleModal();
  };
  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>{heading}</h1>
          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => handleAddButton()}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        <div className="mb-2">
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            <div className="d-block d-md-inline-block pt-1">
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={["search ..."]}
                  onKeyPress={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">
                Tổng số giao dịch: {totalItemCount}
                {" | "}
                Số lượng dòng:
              </span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default ListPageHeading;
