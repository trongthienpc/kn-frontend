import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ListPageHeading from "../components/common/ListPageHeading";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import * as dayjs from "dayjs";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import TransactionModal from "../containers/modals/TransactionModal";
import { getServices } from "../helpers/serviceHelper";
import { createAxios } from "../helpers/tokenHelper";
import { getTransactions } from "../helpers/transactionHelper";
import { Button } from "reactstrap";
import TransactionPageListing from "../components/common/transaction/TransactionPageListing";

const pageSizes = [4, 8, 12, 20];

const Transaction = ({ match }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [items, setItems] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize]);

  const currentUser = useSelector((state) => state.auth?.currentUser);
  const serviceSelector = useSelector((state) => state.service);
  const transactionSelector = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser, dispatch);

  // console.log(transactionSelector);

  // get list services
  useEffect(() => {
    if (serviceSelector.services.length <= 0) {
      getServices(
        currentUser?.accessToken,
        dispatch,
        axiosJWT,
        currentPage,
        selectedPageSize,
        search
      );
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      await getTransactions(
        currentUser?.accessToken,
        dispatch,
        axiosJWT,
        currentPage,
        selectedPageSize,
        search
      );
    }
    fetchData();
    setIsLoaded(true);
  }, [currentPage, selectedPageSize, search]);

  useEffect(() => {
    setTotalPage(transactionSelector.totalPages);
    setItems(transactionSelector.transactions);
    setTotalItemCount(transactionSelector.totalTransactions);
  }, [transactionSelector]);
  const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };

  const onClickEdit = (data) => {
    setIsEdit(true);
    setTransaction(data);
    setModalOpen(!modalOpen);
  };

  const onClickDelete = (id) => {
    console.log(id);
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Danh sách giao dịch"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          match={match}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === "Enter") {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          setIsEdit={setIsEdit}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <TransactionModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={transaction}
          services={serviceSelector?.services}
        />
        <TransactionPageListing
          items={items}
          displayMode={displayMode}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          onClickEdit={onClickEdit}
        />

        {/* <TransactionTableDivided /> */}
      </div>

      <ToastContainer />
    </>
  );
};

export default Transaction;
