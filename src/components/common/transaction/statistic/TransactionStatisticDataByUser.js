import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Button, Row } from "reactstrap";
import * as dayjs from "dayjs";
import { Colxx } from "../../CustomBootstrap";

const KPIPageListing = ({ items, currentPage, totalPage, onChangePage }) => {
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
                  <Th data-priority="3">Tên nhân viên</Th>
                  <Th data-priority="3">Chỉ tiêu</Th>
                  <Th data-priority="3">KPI</Th>
                  <Th data-priority="3">Tổng giá</Th>
                  <Th data-priority="6">Tổng số lượng</Th>
                  <Th data-priority="6">Tổng giảm giá</Th>
                  <Th data-priority="6">Tổng tiền mặt</Th>
                  <Th data-priority="6">Tổng tiền nợ</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items?.map((product) => {
                  return (
                    <Tr key={product.fullName}>
                      <Th>
                        <span className="co-name text-left">
                          {product.fullName}
                        </span>
                      </Th>
                      <Td className="font-weight-bold">
                        {product.target?.toLocaleString()}
                      </Td>
                      <Td
                        className={
                          product.kpi > 100
                            ? "badge badge-primary"
                            : product.kpi > 75
                            ? "badge badge-green"
                            : product.kpi > 50
                            ? "badge badge-info"
                            : product.kpi > 25
                            ? "badge badge-warning"
                            : "badge badge-danger"
                        }
                      >
                        {product.kpi.toFixed(1) + " %"}
                      </Td>
                      <Td className="text-right">
                        {product._sum.price.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product._sum.quantity.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product._sum.discount.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product._sum.cash.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product._sum.debt.toLocaleString()}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </div>
        </div>
      </Colxx>
    </Row>
  );
};

export default React.memo(KPIPageListing);
