import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Nav, NavItem } from "reactstrap";
import classnames from "classnames";
import { Link, NavLink } from "react-router-dom";
import menuItems from "../constants/menu";
import { useDispatch, useSelector } from "react-redux";
import { setContainerClassnamesHelper } from "../helpers/menuHelper";

const Sidebar = () => {
  const [selectedParentMenu, setSelectedParentMenu] = useState("");
  const [viewingParentMenu, setViewingParentMenu] = useState("");

  const dispatch = useDispatch();
  const menuSelector = useSelector((state) => state?.menu);
  const currentUser = useSelector((state) => state?.auth.currentUser);
  const {
    menuHiddenBreakpoint,
    subHiddenBreakpoint,
    containerClassnames,
    selectedMenuHasSubItems,
  } = menuSelector;

  const setSelectedLiActive = (callback) => {
    const selectedParentNoSubItem = document.querySelector(
      ".main-menu  li a.active"
    );

    // console.log(selectedParentNoSubItem);

    if (selectedParentNoSubItem != null) {
      let id = selectedParentNoSubItem.getAttribute("data-flag");
      // console.log(id);
      setSelectedParentMenu(id);
    } else if (selectedParentMenu === "") {
      let id = menuItems[0].id;
      setSelectedParentMenu(id);
    }
  };

  useEffect(() => {
    setSelectedLiActive();
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
  }, []);

  const getMenuClassesForResize = (classes) => {
    let nextClasses = classes?.split(" ").filter((x) => x !== "");
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses?.filter((x) => x !== "menu-mobile");
      if (
        nextClasses?.includes("menu-default") &&
        nextClasses?.includes("menu-sub-hidden")
      ) {
        // nextClasses = nextClasses.filter((x) => x !== "menu-sub-hidden");
      }
    }
    return nextClasses;
  };

  const filteredList = (menuItems) => {
    if (!currentUser.admin) {
      return menuItems.filter((x) => (x.roles && x.roles === 0) || !x.roles);
    }
    return menuItems;
  };

  const handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const nextClasses = getMenuClassesForResize(containerClassnames);
    // console.log(nextClasses);
    setContainerClassnamesHelper(
      0,
      nextClasses?.join(" "),
      selectedMenuHasSubItems,
      dispatch
    );
  };
  const handleClick = (id) => {
    console.log(id);
    setViewingParentMenu(id);
    setSelectedParentMenu(id);
  };

  return (
    <div className="sidebar">
      <div className="main-menu">
        <div className="scroll">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <Nav vertical className="list-unstyled">
              {menuItems &&
                filteredList(menuItems)?.map((item) => {
                  return (
                    <NavItem
                      key={item.id}
                      className={classnames({
                        active:
                          (selectedParentMenu === item.id &&
                            viewingParentMenu === "") ||
                          viewingParentMenu === item.id,
                      })}
                    >
                      {item.newWindow ? (
                        <Link
                          to={item.to}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <i className={item.icon} /> {item.label}
                        </Link>
                      ) : (
                        <NavLink
                          to={item.to}
                          onClick={() => handleClick(item.id)}
                          data-flag={item.id}
                        >
                          <i className={item.icon} /> {item.label}
                        </NavLink>
                      )}
                    </NavItem>
                  );
                })}
            </Nav>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
