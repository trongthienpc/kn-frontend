import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ListPageHeading from "../components/common/ListPageHeading";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import * as dayjs from "dayjs";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  TransactionTableDivided,
  TransactionTableWithPaginationCard,
} from "../components/common/table/TransactionTableCards";
import TransactionPageListing from "../components/common/transaction/TransactionPageListing";
import TransactionModal from "../containers/modals/TransactionModal";
import { getServices } from "../helpers/serviceHelper";
import { createAxios } from "../helpers/tokenHelper";
import { getTransactions } from "../helpers/transactionHelper";
import {
  Badge,
  Button,
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import ContextMenuContainer from "../components/common/ContextMenuContainer";
import { ContextMenuTrigger } from "react-contextmenu";

const pageSizes = [4, 8, 12, 20];

const Transaction = ({ match }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [transaction, setTransaction] = useState({});
  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedPageSize]);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth?.currentUser);
  const serviceSelector = useSelector((state) => state.service);
  const transactionSelector = useSelector((state) => state.transaction);
  const axiosJWT = createAxios(currentUser, dispatch);

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

    getTransactions(
      currentUser?.accessToken,
      dispatch,
      axiosJWT,
      currentPage,
      selectedPageSize,
      search
    );

    setIsLoaded(true);
  }, []);

  // setTotalPage(groupSelector?.totalPages);
  // setItems(groupSelector?.groups);
  // setSelectedItems([]);
  // setTotalItemCount(groupSelector?.totalGroups);
  // setIsLoaded(true);
  //   }, [selectedPageSize, currentPage]);

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
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
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
          // toggleModal={() => setModalOpen(!modalOpen)}
          setModalOpen={setModalOpen}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={transaction}
          services={serviceSelector?.services}
        />

        {/* <TransactionTableDivided /> */}

        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <Thead>
                <Tr>
                  <Th data-priority="1">Khách hàng</Th>
                  <Th data-priority="3">Tên dịch vụ</Th>
                  <Th data-priority="3">Giá tiền</Th>
                  <Th data-priority="3">Số lượng</Th>
                  <Th data-priority="3">Số tiền giảm</Th>
                  <Th data-priority="6">Số tiền mặt</Th>
                  <Th data-priority="6">Số tiền nợ</Th>
                  <Th data-priority="6">Ngày giao dịch</Th>
                  <Th data-priority="6">Thưc hiện</Th>
                  <Th data-priority="6">Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactionSelector?.transactions?.map((element, index) => (
                  <Tr key={index} onDoubleClick={() => onClickEdit(element)}>
                    <Th>
                      <span className="co-name text-left">
                        {element.customerName}
                      </span>
                    </Th>
                    <Td className="text-left">{element.serviceName}</Td>
                    <Td className="text-right">
                      {element.price?.toLocaleString()}
                    </Td>
                    <Td className="text-right">{element.quantity}</Td>
                    <Td className="text-right">
                      {element.discount?.toLocaleString()}
                    </Td>
                    <Td className="text-right">
                      {element.cash?.toLocaleString()}
                    </Td>
                    <Td className="text-right">
                      {element.debt?.toLocaleString()}
                    </Td>
                    <Td className="text-center">
                      {dayjs(element.transactionDate).format("DD/MM/YYYY")}
                    </Td>
                    <Td className="text-right">{element.fullName}</Td>
                    <Td className="text-center">
                      <Button className="mb-2 btn btn-warning btn-xs">
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Transaction;
