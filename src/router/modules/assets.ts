import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Assets",
  component: Layout,
  redirect: "/assets",
  meta: {
    icon: "walletFilled",
    title: $t("menus.hsassets"),
    rank: 1
  },
  children: [
    {
      path: "/assets",
      name: "Assets",
      component: () => import("@/views/assets/index.vue"),
      meta: {
        icon: "walletFilled",
        title: $t("menus.hsassets")
      }
    }
  ]
} as RouteConfigsTable;
