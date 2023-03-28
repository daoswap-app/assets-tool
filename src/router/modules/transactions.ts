import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Transactions",
  component: Layout,
  redirect: "/transactions",
  meta: {
    icon: "sort",
    title: $t("menus.hstransactions"),
    rank: 2
  },
  children: [
    {
      path: "/transactions",
      name: "Transactions",
      component: () => import("@/views/transactions/index.vue"),
      meta: {
        icon: "sort",
        title: $t("menus.hstransactions")
      }
    }
  ]
} as RouteConfigsTable;
