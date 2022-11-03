import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ListPageHeading from "../components/common/ListPageHeading";
import ListPageListing from "../components/common/ListPageListing";
import ServiceGroupPageListing from "../components/common/ServiceGroupPageListing";
import { servicePath } from "../constants/defaultValues";
import ServiceGroupModal from "../containers/modals/ServiceGroupModal";
import { getServiceGroups } from "../helpers/serviceGroupHelper";
import { createAxios } from "../helpers/tokenHelper";

const pageSizes = [4, 8, 12, 20];
const ServiceGroup = ({ match }) => {
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
  const [group, setGroup] = useState({});

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedPageSize]);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);

  const groupSelector = useSelector((state) => state.serviceGroup);
  console.log(groupSelector);

  const axiosJWT = createAxios(currentUser, dispatch);
  // console.log("object");

  useEffect(() => {
    getServiceGroups(
      currentUser?.accessToken,
      dispatch,
      axiosJWT,
      currentPage,
      selectedPageSize,
      search
    );
    setIsLoaded(true);
  }, []);

  //   useEffect(() => {
  //   async function fetchData() {
  //     axios
  //       .get(
  //         `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
  //       )
  //       .then((res) => {
  //         return res.data;
  //       })
  //       .then((data) => {
  //         setTotalPage(data.totalPage);
  //         setItems(
  //           data.data.map((x) => {
  //             return { ...x, img: x.img.replace("img/", "img/products/") };
  //           })
  //         );
  //         setSelectedItems([]);
  //         setTotalItemCount(data.totalItem);
  //         setIsLoaded(true);
  //       });
  //   }
  //   fetchData();
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
    document.activeElement.blur();
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
        const temp = groupSelector.groups.filter(
          (g) => g.id === selectedItems[0]
        );
        setGroup(temp);
        setIsEdit(true);
        setModalOpen(true);
        break;
    }
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
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
          heading="Nhóm dịch vụ"
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
        <ServiceGroupModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          axiosJWT={axiosJWT}
          dispatch={dispatch}
          isEdit={isEdit}
          object={group}
          // categories={categories}
        />
        <ServiceGroupPageListing
          items={groupSelector?.groups}
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

export default ServiceGroup;
