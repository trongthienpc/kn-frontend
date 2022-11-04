import React from "react";
import { Row } from "reactstrap";
import ContextMenuContainer from "./ContextMenuContainer";
import ImageListView from "./ImageListView";
import Pagination from "./Pagination";
import ServiceDataListView from "./ServiceDataListView";
import ServiceGroupDataListView from "./ServiceGroupDataListView";
import ThumbListView from "./ThumbListView";

function collect(props) {
  return { data: props.data };
}

const ServicePageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onChangePage,
  onContextMenuClick,
  onContextMenu,
}) => {
  console.log(items);
  return (
    <Row>
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
          <ServiceDataListView
            key={product.id}
            product={product}
            isSelect={selectedItems.includes(product.id)}
            onCheckItem={onCheckItem}
            collect={collect}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ServicePageListing);
