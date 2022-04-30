import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import basicShapeView from "../views/basicShapeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "basicShapeView",
    component: basicShapeView,
  },
  {
    path: "/mouseSelector",
    name: "mouseSelector",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mouseSelector.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
