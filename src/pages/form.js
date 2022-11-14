import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ListPageHeading from "../components/common/ListPageHeading";
import ModalGeneric from "../containers/modals/ModalGeneric";

const options = [
  { value: "food", label: "Food" },
  { value: "beingfabulous", label: "Being Fabulous", disabled: true },
  { value: "reasonml", label: "ReasonML" },
  { value: "unicorns", label: "Unicorns" },
  { value: "kittens", label: "Kittens" },
];

const fields = [
  {
    name: "username",
    type: "text",
    id: "username",
    value: "PC-01416",
    label: "User name",
  },
  {
    name: "group",
    type: "checkboxGroup",
    id: "group",
    value: ["kittens"],
    text: "Which of these?",
    label: "Which of these?",
    options: options,
  },
];

const FormPattern = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("false");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Tiêu đề"
          //   changePageSize={setSelectedPageSize}
          //   selectedPageSize={selectedPageSize}
          //   totalItemCount={totalItemCount}
          //   itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          setIsEdit={setIsEdit}
          //   pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <ModalGeneric
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          //   axiosJWT={axiosJWT}
          //   dispatch={dispatch}
          isEdit={isEdit}
          //   object={transaction}
          //   services={serviceSelector?.services}
          fields={fields}
        />

        {/* <ResponsiveTable
          headers={headers}
          cols={cols}
          items={items}
          displayMode={displayMode}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          onClickEdit={onClickEdit}
        /> */}

        {/* <TransactionTableDivided /> */}
      </div>

      <ToastContainer />
    </>
  );
};

export default FormPattern;
