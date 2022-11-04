import React from "react";
import { Card, CustomInput, Badge, Label } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../CustomBootstrap";
import Moment from "react-moment";
const TransactionDataListView = ({
  product,
  isSelect,
  collect,
  onCheckItem,
}) => {
  // console.log(product);

  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, product.id)}
          className={classnames("d-flex flex-row", {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">{product.id}</p>
              </NavLink>
              <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.serviceName}
                </p>
              </NavLink>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.price}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.quantity}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.discount}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.cash}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.debt}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <Moment format="DD/MM/yyyy">{product.transactionDate}</Moment>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.customerName}
                </p>
              </Label>
              {/* <div className="w-15 w-sm-100">
                <Badge color={product.status ? "primary" : "secondary"} pill>
                  {product.status ? "Kích hoạt" : " Tạm dừng"}
                </Badge>
              </div> */}
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                {product.createdDate}
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.createdBy}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="mb-1 text-muted text-small w-15 w-sm-100">
                  {product.updatedDate}
                </p>
              </Label>
              <Label to={`?p=${product.id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.updatedBy}
                </p>
              </Label>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${product.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(TransactionDataListView);
