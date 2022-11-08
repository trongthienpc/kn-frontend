import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Row } from "reactstrap";
import Pagination from "../Pagination";
import * as dayjs from "dayjs";
import { Colxx } from "../CustomBootstrap";

const ResponsiveTable = ({
  headers,
  cols,
  items,
  currentPage,
  totalPage,
  onChangePage,
  onClickEdit,
}) => {
  return (
    <Row>
      <Colxx xxs="12">
        <div className="table-rep-plugin">
          <div
            className="table-responsive mb-0"
            data-pattern="priority-columns"
          >
            <Table
              id="tech-companies-1"
              className="table table-striped table-bordered"
            >
              <Thead>
                <Tr>
                  {headers?.map((header, index) => {
                    return (
                      <Th className="text-center" key={index}>
                        {header}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {items?.map((product, index) => {
                  return (
                    <Tr key={index} onDoubleClick={() => onClickEdit(product)}>
                      {cols?.map((col, index) => {
                        return index === 0 ? (
                          <Th key={index}>
                            <span
                              className={
                                col?.typeof === "number"
                                  ? "text-right co-name"
                                  : col?.typeof === "date"
                                  ? "text-center co-name"
                                  : "text-left co-name"
                              }
                            >
                              {
                                product[
                                  Object.keys(product).filter(
                                    (key) => key === col?.name
                                  )
                                ]
                              }
                            </span>
                          </Th>
                        ) : (
                          <Td
                            className={
                              col?.typeof === "number"
                                ? "text-right"
                                : col?.typeof === "date"
                                ? "text-center"
                                : "text-left"
                            }
                            key={index}
                          >
                            {col?.typeof === "number"
                              ? product[
                                  Object.keys(product).filter(
                                    (key) => key === col?.name
                                  )
                                ]?.toLocaleString()
                              : col?.typeof === "date"
                              ? dayjs(
                                  product[
                                    Object.keys(product).filter(
                                      (key) => key === col?.name
                                    )
                                  ]
                                ).format("DD/MM/YYYY")
                              : product[
                                  Object.keys(product).filter(
                                    (key) => key === col?.name
                                  )
                                ]}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => onChangePage(i)}
        />
      </Colxx>
    </Row>
  );
};

export default React.memo(ResponsiveTable);
