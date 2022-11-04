import { useTable, usePagination, useSortBy } from "react-table";
import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import classnames from "classnames";
import DataTablePagination from "./DatatablePagination";
import { useSelector } from "react-redux";

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ "table-divided": divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sorted-desc"
                        : "sorted-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DataTablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const TransactionTableWithPaginationCard = () => {
  const transactionSelector = useSelector((state) => state.transaction);
  const cols = React.useMemo(
    () => [
      {
        Header: "Khách hàng",
        accessor: "customerName",
        cellClass: "list-item-heading w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Tên dịch vụ",
        accessor: "serviceName",
        cellClass: "list-item-heading w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Giá tiền",
        accessor: "price",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số lượng",
        accessor: "quantity",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số tiền giảm",
        accessor: "discount",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Trả tiền mặt",
        accessor: "cash",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số tiền nợ",
        accessor: "debt",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Ngày giao dịch",
        accessor: "transactionDate",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Thực hiện",
        accessor: "fullName",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>Bảng dịch vụ</CardTitle>
        <Table columns={cols} data={transactionSelector?.transactions} />
      </CardBody>
    </Card>
  );
};

export const TransactionTableDivided = () => {
  const transactionSelector = useSelector((state) => state.transaction);
  const cols = React.useMemo(
    () => [
      {
        Header: "Khách hàng",
        accessor: "customerName",
        cellClass: "list-item-heading w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Tên dịch vụ",
        accessor: "serviceName",
        cellClass: "list-item-heading w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Giá tiền",
        accessor: "price",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số lượng",
        accessor: "quantity",
        cellClass: "text-muted w-10",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số tiền giảm",
        accessor: "discount",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Trả tiền mặt",
        accessor: "cash",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Số tiền nợ",
        accessor: "debt",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Ngày giao dịch",
        accessor: "transactionDate",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Thực hiện",
        accessor: "fullName",
        cellClass: "text-muted w-40",
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>Bảng giao dịch</CardTitle>
      <Table columns={cols} data={transactionSelector?.transactions} />
    </div>
  );
};
