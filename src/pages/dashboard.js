import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ReactTableWithPaginationCard } from "../components/common/transaction/statistic/ReactTableCard";
import TransactionStatisticPageListing from "../components/common/transaction/statistic/TransactionStatisticPageListing";
import { getKpis } from "../helpers/kpiHelper";
import { createAxios } from "../helpers/tokenHelper";
import { getStatistics } from "../helpers/transactionHelper";

const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const transactionSelector = useSelector((state) => state.transaction);
  const kpiSelector = useSelector((state) => state.kpi);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(currentUser, dispatch);
  const navigate = useNavigate();
  const checkAccess = () => {
    if (!currentUser?.admin) {
      navigate("/transactions");
    }
  };
  useEffect(() => {
    checkAccess();
    async function fetchDataStatistic() {
      await getStatistics(currentUser?.accessToken, dispatch, axiosJWT);
    }
    async function fetchKPIData() {
      await getKpis(currentUser?.accessToken, dispatch, axiosJWT);
    }
    fetchDataStatistic();
    fetchKPIData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    console.log(transactionSelector.statistics);
    console.log(kpiSelector?.kpis);
    const temp = transactionSelector.statistics?.map((s) => {
      return {
        ...s,
        target: kpiSelector?.kpis?.filter((k) => k.username === s.username)[0]
          .target,
        kpi:
          ((s?._sum?.quantity * s?._sum?.price) /
            kpiSelector?.kpis?.filter((k) => k.username === s.username)[0]
              .target) *
          100,
      };
    });
    setData(temp);
  }, [transactionSelector, kpiSelector]);
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        {/* <TransactionStatisticPageListing
          items={transactionSelector?.statistics}
        /> */}
        <ReactTableWithPaginationCard products={data} />
      </div>
    </>
  );
};

export default Dashboard;
