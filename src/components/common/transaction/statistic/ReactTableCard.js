import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useTable, usePagination, useSortBy } from "react-table";
import classnames from "classnames";

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, page } =
    useTable(
      {
        columns,
        data,
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
    </>
  );
}
export const ReactTableWithPaginationCard = ({ products }) => {
  const cols = React.useMemo(
    () => [
      {
        Header: "Nhân viên",
        accessor: "fullName",
        cellClass: "list-item-heading w-30",
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: "Tổng giá",
        accessor: "_sum.price",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => <>{props.value.toLocaleString()}</>,
      },
      {
        Header: "Tổng số lượng",
        accessor: "_sum.quantity",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => <>{props.value.toLocaleString()}</>,
      },
      {
        Header: "Tổng giảm giá",
        accessor: "_sum.discount",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => <>{props.value.toLocaleString()}</>,
      },
      {
        Header: "Tổng tiền mặt",
        accessor: "_sum.cash",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => <>{props.value.toLocaleString()}</>,
      },
      {
        Header: "Tổng tiền nợ",
        accessor: "_sum.debt",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => <>{props.value.toLocaleString()}</>,
      },
      {
        Header: "Target",
        accessor: "target",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => (
          <span className="font-weight-bold badge badge-outline-primary">
            {props?.value?.toLocaleString()}
          </span>
        ),
      },
      {
        Header: "KPI",
        accessor: "kpi",
        cellClass: "text-muted w-10 text-right",
        Cell: (props) => (
          <span
            className={
              props?.value > 100
                ? "badge badge-primary"
                : props.value > 75
                ? "badge badge-green"
                : props.value > 50
                ? "badge badge-info"
                : props.value > 25
                ? "badge badge-warning"
                : "badge badge-danger"
            }
          >
            {props?.value?.toLocaleString() + "%"}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>Thống kê doanh số theo nhân viên</CardTitle>
        <Table columns={cols} data={products} />
      </CardBody>
    </Card>
  );
};
