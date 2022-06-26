import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import basicShapeView from "../views/basicShapeView.vue";
import animationExamplesView from "../views/animationExamplesView.vue";
import allBasicShapeView from "../views/allBasicShapeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "basicShapeView",
    component: basicShapeView,
  },
  {
    path: "/mouseSelectorView",
    name: "mouseSelectorView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/mouseSelectorView.vue"),
  },
  {
    path: "/animationExamplesView",
    name: "animationExamplesView",
    component: animationExamplesView,
  },
  {
    path: "/allBasicShapeView",
    name: "allBasicShapeView",
    component: allBasicShapeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
