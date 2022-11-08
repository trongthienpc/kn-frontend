import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Button, Row } from "reactstrap";
import ImageListView from "../ImageListView";
import Pagination from "../Pagination";
import ThumbListView from "../ThumbListView";
import * as dayjs from "dayjs";
import { Colxx } from "../CustomBootstrap";

function collect(props) {
  return { data: props.data };
}

const TransactionPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
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
                  <Th data-priority="1">Khách hàng</Th>
                  <Th data-priority="3">Tên dịch vụ</Th>
                  <Th data-priority="3">Giá tiền</Th>
                  <Th data-priority="3">Số lượng</Th>
                  <Th data-priority="3">Số tiền giảm</Th>
                  <Th data-priority="6">Số tiền mặt</Th>
                  <Th data-priority="6">Số tiền nợ</Th>
                  <Th data-priority="6">Ngày giao dịch</Th>
                  <Th data-priority="6">Thưc hiện</Th>
                  <Th data-priority="6">Thao tác</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items?.map((product) => {
                  if (displayMode === "imagelist") {
                    return (
                      <ImageListView
                        key={product.id}
                        product={product}
                        isSelect={selectedItems.includes(product.id)}
                        collect={collect}
                        onCheckItem={onCheckItem}
                      />
                    );
                  }
                  if (displayMode === "thumblist") {
                    return (
                      <ThumbListView
                        key={product.id}
                        product={product}
                        isSelect={selectedItems.includes(product.id)}
                        collect={collect}
                        onCheckItem={onCheckItem}
                      />
                    );
                  }
                  return (
                    // <TransactionDataListView
                    //   key={product.id}
                    //   product={product}
                    //   isSelect={selectedItems.includes(product.id)}
                    //   onCheckItem={onCheckItem}
                    //   collect={collect}
                    // />

                    <Tr
                      key={product.id}
                      onDoubleClick={() => onClickEdit(product)}
                    >
                      <Th>
                        <span className="co-name text-left">
                          {product.customerName}
                        </span>
                      </Th>
                      <Td className="text-left">{product.serviceName}</Td>
                      <Td className="text-right">
                        {product.price?.toLocaleString()}
                      </Td>
                      <Td className="text-right">{product.quantity}</Td>
                      <Td className="text-right">
                        {product.discount?.toLocaleString()}
                      </Td>
                      <Td className="text-right">
                        {product.cash?.toLocaleString()}
                      </Td>
                      <Td
                        className={
                          Object.prototype.toString.call(product.debt) ===
                          "[object Number]"
                            ? "text-primary"
                            : "text-info"
                        }
                      >
                        {product.debt?.toLocaleString()}
                      </Td>
                      <Td
                        className={
                          Object.prototype.toString.call(
                            product.transactionDate
                          ) === "[object Number]"
                            ? "text-primary"
                            : "text-info"
                        }
                      >
                        {dayjs(product.transactionDate).format("DD/MM/YYYY")}
                      </Td>
                      <Td className="text-right">{product.fullName}</Td>
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

export default React.memo(TransactionPageListing);
