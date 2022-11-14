import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import UserModal from "../../containers/modals/UserModal";
// import { getUsers } from "../../helpers/userHelper";
import ListPageHeading from "../../components/common/ListPageHeading";
import ResponsiveTable from "../../components/common/table/ResponsiveTable";
import { createAxios } from "../../helpers/tokenHelper";
import { checkAccess, getUsers, resetPassword } from "../../helpers/userHelper";
import { useNavigate } from "react-router-dom";

const pageSizes = [4, 8, 12, 20];

const headers = [
  "Mã nhân viên",
  "Tên nhân viên",
  "Ngày tạo",
  "Người tạo",
  "Ngày cập nhật",
  "Người cập nhật",
  "Thao tác",
];

const cols = [
  {
    name: "username",
    typeof: "string",
  },
  {
    name: "name",
    typeof: "string",
  },
  {
    name: "createdDate",
    typeof: "date",
  },
  {
    name: "createdBy",
    typeof: "string",
  },
  {
    name: "updatedDate",
    typeof: "date",
  },
  {
    name: "updatedBy",
    typeof: "string",
  },
  {
    name: "reset",
    label: "Reset Password",
    typeof: "function",
  },
];

const User = ({ match }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [totalPage, setTotalPage] = useState(1);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [items, setItems] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize]);

  const currentUser = useSelector((state) => state.auth?.currentUser);
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser, dispatch);
  const navigate = useNavigate();
  // console.log(transactionSelector);

  // get list services
  useEffect(() => {
    checkAccess({ navigate, currentUser });
    if (userSelector.users.length <= 0) {
      getUsers(
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
      await getUsers(
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
    setTotalPage(userSelector.totalPages);
    setItems(userSelector.users);
    setTotalItemCount(userSelector.totalUsers);
  }, [userSelector]);

  const onClickEdit = (data) => {
    setIsEdit(true);
    setUser(data);
    setModalOpen(!modalOpen);
  };

  const onClickReset = async (data) => {
    console.log(data);
    let { updatedBy, ...user } = data;
    updatedBy = currentUser.name;
    await resetPassword(currentUser?.accessToken, dispatch, axiosJWT, {
      ...user,
      updatedBy,
    });
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Danh sách người dùng"
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
        <UserModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={user}
        />
        {/* <TransactionPageListing
          items={items}
          displayMode={displayMode}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          onClickEdit={onClickEdit}
        /> */}
        <ResponsiveTable
          headers={headers}
          cols={cols}
          items={items}
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={setCurrentPage}
          onClickEdit={onClickEdit}
          onClickReset={onClickReset}
        />

        {/* <TransactionTableDivided /> */}
      </div>

      <ToastContainer />
    </>
  );
};

export default User;
