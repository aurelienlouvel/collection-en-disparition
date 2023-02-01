import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: () => import("@/pages/OnboardingPage.vue"),
    },
    {
      path: "/story",
      name: "story",
      component: () => import("@/pages/StoryPage.vue"),
    },
    {
      path: "/map",
      name: "map",
      component: () => import("@/pages/MapPage.vue"),
    },
    {
      path: "/camera",
      name: "camera",
      component: () => import("@/pages/CameraPage.vue"),
    },
    {
      path: "/reward",
      name: "reward",
      component: () => import("@/pages/RewardPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

export default router;
