import React from "react";
import { Card, Label } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../../CustomBootstrap";

const TransactionStatisticDataListView = ({ product }) => {
  // console.log(product);

  return (
    <Colxx xxs="12" className="mb-3">
      <Card
        className={classnames("d-flex flex-row", {
          //   active: isSelect,
        })}
      >
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product.username}
              </p>
            </Label>
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product?._sum?.price}
              </p>
            </Label>
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product?._sum?.quantity}
              </p>
            </Label>
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product?._sum?.discount}
              </p>
            </Label>
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product?._sum?.cash}
              </p>
            </Label>
            <Label className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">
                {product?._sum?.debt}
              </p>
            </Label>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(TransactionStatisticDataListView);
