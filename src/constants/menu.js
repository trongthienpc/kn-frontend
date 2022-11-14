import { adminRoot, UserRole } from "./defaultValues";

const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "Dashboards",
    to: `home`,
    roles: 1,
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
    roles: 1,
  },
  {
    id: "services",
    icon: "iconsminds-bucket",
    label: "Dịch vụ",
    to: `services`,
    roles: 1,
  },

  {
    id: "transactions",
    icon: "iconsminds-testimonal",
    label: "Giao dịch",
    to: `transactions`,
  },
  {
    id: "kpis",
    icon: "simple-icon-target",
    label: "KPIs",
    to: `kpis`,
  },
  {
    id: "users",
    icon: "simple-icon-people",
    label: "Users Management",
    to: `users`,
    roles: 1,
  },
  {
    id: "test",
    icon: "simple-icon-people",
    label: "Test Page",
    to: `test`,
    roles: 1,
  },
];
export default data;
