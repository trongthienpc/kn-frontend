import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getServiceGroups } from "../helpers/serviceGroupHelper";
import { createAxios } from "../helpers/tokenHelper";
import { checkAccess } from "../helpers/userHelper";

const Blank = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.currentUser);
  //   console.log(currentUser);
  console.log("object");
  const groupSelector = useSelector((state) => state.group);
  const axiosJWT = createAxios(currentUser, dispatch);
  const navigate = useNavigate();
  useEffect(() => {
    checkAccess({ navigate, currentUser });
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
