import { adminRoot } from "./defaultValues";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "Dashboards",
    to: `home`,
    // roles: [UserRole.Admin, UserRole.Editor],
    // subs: [
    //   {
    //     icon: "simple-icon-briefcase",
    //     label: "Default",
    //     to: `${adminRoot}/dashboards/default`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: "simple-icon-pie-chart",
    //     label: "Analytics",
    //     to: `${adminRoot}/dashboards/analytics`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: "simple-icon-basket-loaded",
    //     label: "menu.ecommerce",
    //     to: `${adminRoot}/dashboards/ecommerce`,
    //     // roles: [UserRole.Editor],
    //   },
    //   {
    //     icon: "simple-icon-doc",
    //     label: "menu.content",
    //     to: `${adminRoot}/dashboards/content`,
    //     // roles: [UserRole.Editor],
    //   },
    // ],
  },
  {
    id: "serviceGroups",
    icon: "iconsminds-bag-quantity",
    label: "Nhóm dịch vụ",
    to: `serviceGroups`,
  },
  {
    id: "services",
    icon: "iconsminds-bucket",
    label: "Dịch vụ",
    to: `services`,
  },

  {
    id: "transactions",
    icon: "iconsminds-testimonal",
    label: "Giao dịch",
    to: `transactions`,
  },
];
export default data;
