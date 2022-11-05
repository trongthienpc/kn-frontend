import React from "react";
import { useTable } from "react-table";
import { Row } from "reactstrap";
import TransactionStatisticDataListView from "./TransactionStatisticDataListView";
import classnames from "classnames";
function collect(props) {
  return { data: props.data };
}

const TransactionStatisticPageListing = ({ items }) => {
  console.log(items);
  return (
    <Row>
      {items?.map((product) => {
        return (
          <TransactionStatisticDataListView
            key={product?.username}
            product={product}
            collect={collect}
          />
        );
      })}
    </Row>
  );
};

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, page } =
    useTable({
      columns,
      data,
    });

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

export default React.memo(TransactionStatisticPageListing);
