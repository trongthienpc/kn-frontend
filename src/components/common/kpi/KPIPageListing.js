import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Button, Row } from "reactstrap";
import * as dayjs from "dayjs";
import { Colxx } from "../CustomBootstrap";
import Pagination from "../Pagination";

function collect(props) {
  return { data: props.data };
}

const KPIPageListing = ({
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
                  <Th data-priority="1">Mã nhân viên</Th>
                  <Th data-priority="3">Tên nhân viên</Th>
                  <Th data-priority="3">Chỉ tiêu</Th>
                  <Th data-priority="3">Thời gian</Th>
                  <Th data-priority="6">Người tạo</Th>
                  <Th data-priority="6">Thời gian tạo</Th>
                  <Th data-priority="6">Người cập nhật</Th>
                  <Th data-priority="6">Thời gian cập nhật</Th>
                  <Th data-priority="6">Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items?.map((product) => {
                  return (
                    <Tr
                      key={product.id}
                      onDoubleClick={() => onClickEdit(product)}
                    >
                      <Th>
                        <span className="co-name text-left">
                          {product.username}
                        </span>
                      </Th>
                      <Td className="text-left">{product.name}</Td>
                      <Td className="text-right">
                        {product.target?.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product.month}/{product.year}
                      </Td>
                      <Td className="text-right">{product.createdBy}</Td>
                      <Td className="text-center">
                        {dayjs(product.createdDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td className="text-right">{product.UpdatedBy}</Td>
                      <Td className="text-center">
                        {dayjs(product.updatedDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td className="text-center">
                        <Button className="mb-2 btn btn-warning btn-xs">
                          Delete
                        </Button>
                      </Td>
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

export default React.memo(KPIPageListing);
