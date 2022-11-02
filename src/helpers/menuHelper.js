import {
  MENU_CLICK_MOBILE_MENU,
  MENU_SET_CLASSNAMES,
} from "../store/reducers/menuSlice";

export const setContainerClassnamesHelper = (
  clickIndex,
  strCurrentClasses,
  selectedMenuHasSubItems,
  dispatch
) => {
  const currentClasses = strCurrentClasses
    ? strCurrentClasses.split(" ").filter((x) => x !== "")
    : "";
  let nextClasses = "";
  if (!selectedMenuHasSubItems) {
    if (
      currentClasses.includes("menu-default") &&
      (clickIndex % 4 === 0 || clickIndex % 4 === 3)
    ) {
      clickIndex = 1;
    }
    if (currentClasses.includes("menu-sub-hidden") && clickIndex % 4 === 2) {
      clickIndex = 0;
    }
    if (
      currentClasses.includes("menu-hidden") &&
      (clickIndex % 4 === 2 || clickIndex % 4 === 3)
    ) {
      clickIndex = 0;
    }
  }

  if (clickIndex % 4 === 0) {
    if (
      currentClasses.includes("menu-default") &&
      currentClasses.includes("menu-sub-hidden")
    ) {
      nextClasses = "menu-default menu-sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default menu-sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden";
    }
    clickIndex = 0;
  } else if (clickIndex % 4 === 1) {
    if (
      currentClasses.includes("menu-default") &&
      currentClasses.includes("menu-sub-hidden")
    ) {
      nextClasses = "menu-default menu-sub-hidden main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary";
    }
  } else if (clickIndex % 4 === 2) {
    if (
      currentClasses.includes("menu-default") &&
      currentClasses.includes("menu-sub-hidden")
    ) {
      nextClasses = "menu-default menu-sub-hidden sub-hidden";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default main-hidden sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden sub-hidden";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary sub-show-temporary";
    }
  } else if (clickIndex % 4 === 3) {
    if (
      currentClasses.includes("menu-default") &&
      currentClasses.includes("menu-sub-hidden")
    ) {
      nextClasses = "menu-default menu-sub-hidden sub-show-temporary";
    } else if (currentClasses.includes("menu-default")) {
      nextClasses = "menu-default sub-hidden";
    } else if (currentClasses.includes("menu-sub-hidden")) {
      nextClasses = "menu-sub-hidden sub-show-temporary";
    } else if (currentClasses.includes("menu-hidden")) {
      nextClasses = "menu-hidden main-show-temporary";
    }
  }
  if (currentClasses.includes("menu-mobile")) {
    nextClasses += " menu-mobile";
  }

  dispatch(
    MENU_SET_CLASSNAMES({
      containerClassnames: nextClasses,
      menuClickCount: clickIndex,
    })
  );
};

export const clickOnMobileMenuHelper = (strCurrentClasses, dispatch) => {
  const currentClasses = strCurrentClasses
    ? strCurrentClasses
        .split(" ")
        .filter((x) => x !== "" && x !== "sub-show-temporary")
    : "";
  let nextClasses = "";
  if (currentClasses.includes("main-show-temporary")) {
    nextClasses = currentClasses
      .filter((x) => x !== "main-show-temporary")
      .join(" ");
  } else {
    nextClasses = `${currentClasses.join(" ")} main-show-temporary`;
  }

  dispatch(
    MENU_CLICK_MOBILE_MENU({
      containerClassnames: nextClasses,
      menuClickCount: 0,
    })
  );
};
