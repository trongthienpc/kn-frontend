import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import KPIPageListing from "../components/common/kpi/KPIPageListing";
import ListPageHeading from "../components/common/ListPageHeading";
import KpiModal from "../containers/modals/KpiModal";
import { getKpis } from "../helpers/kpiHelper";
import { createAxios } from "../helpers/tokenHelper";
import { getUsers } from "../helpers/userHelper";
const pageSizes = [4, 8, 12, 20];
const KPI = () => {
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
  const userSelector = useSelector((state) => state.user);
  const kpiSelector = useSelector((state) => state.kpi);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser, dispatch);

  useEffect(() => {
    async function fetchUserData() {
      await getUsers(
        currentUser?.accessToken,
        dispatch,
        axiosJWT,
        currentPage,
        selectedPageSize,
        search
      );
    }
    fetchUserData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      await getKpis(
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
    setTotalPage(kpiSelector.totalPages);
    setItems(kpiSelector.kpis);
    setTotalItemCount(kpiSelector.kpis.length);
  }, [kpiSelector]);

  const onClickEdit = (data) => {
    setIsEdit(true);
    setTransaction(data);
    setModalOpen(!modalOpen);
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Danh sách chỉ tiêu"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
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
        <KpiModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={transaction}
          users={userSelector?.users}
        />
        <KPIPageListing
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

export default KPI;
