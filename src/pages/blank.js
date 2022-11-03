import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceGroups } from "../helpers/serviceGroupHelper";
import { createAxios } from "../helpers/tokenHelper";

const Blank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  //   console.log(currentUser);
  console.log("object");
  const groupSelector = useSelector((state) => state.group);
  const axiosJWT = createAxios(currentUser, dispatch);

  useEffect(() => {
    getServiceGroups(
      currentUser?.accessToken,
      dispatch,
      axiosJWT,
      currentPage,
      selectedPageSize
      // search
    );
    // setIsLoaded(true);
  }, []);

  return <div>Blank</div>;
};

export default Blank;
