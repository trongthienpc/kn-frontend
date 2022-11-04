import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ListPageHeading from "../components/common/ListPageHeading";
import ListPageListing from "../components/common/ListPageListing";
import ServiceGroupPageListing from "../components/common/ServiceGroupPageListing";
import ServicePageListing from "../components/common/ServicePageListing";
import ServiceGroupModal from "../containers/modals/ServiceGroupModal";
import ServiceModal from "../containers/modals/ServiceModal";
import { getServices } from "../helpers/serviceHelper";
import { createAxios } from "../helpers/tokenHelper";

const pageSizes = [4, 8, 12, 20];
const Service = ({ match }) => {
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
  const [service, setService] = useState({});
  const [groups, setGroups] = useState([]);
  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedPageSize]);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const serviceSelector = useSelector((state) => state.service);
  const groupSelector = useSelector((state) => state.serviceGroup);

  // console.log(groupSelector);

  const axiosJWT = createAxios(currentUser, dispatch);
  // console.log("object");

  useEffect(() => {
    getServices(
      currentUser?.accessToken,
      dispatch,
      axiosJWT,
      currentPage,
      selectedPageSize,
      search
    );
    setIsLoaded(true);
    setGroups(groupSelector.groups);
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

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, "id");
      const end = getIndex(lastChecked, newItems, "id");
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    // document.activeElement.blur();
    return false;
  };

  const onContextMenuClick = (e, data) => {
    switch (data.action) {
      case "delete":
        console.log("onContextMenuClick - action : ", data.action);
        break;

      default:
        if (selectedItems.length > 1) {
          console.log("Chỉ chọn 1 dòng khi cập nhật");
          break;
        }
        const temp = serviceSelector.services.filter(
          (g) => g.id === selectedItems[0]
        );
        setService(temp);
        console.log(temp);
        setIsEdit(true);
        setModalOpen(true);
        break;
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    console.log(clickedProductId);
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="Danh sách dịch vụ"
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
        <ServiceModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={service}
          groups={groups}
        />
        <ServicePageListing
          items={serviceSelector?.services}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Service;
