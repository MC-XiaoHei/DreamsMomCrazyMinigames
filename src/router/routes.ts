import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/MinigamesPage.vue')},
      {path: '/about', component: () => import('pages/AboutPage.vue')},
      {path: '/minigames/RescueCaptainOhm', component: () => import(('pages/minigames/rescue-captain-ohm/RescueCaptainOhm.vue'))},
      {path: '/minigames/HappyPointedDripstone', component: () => import(('pages/minigames/happy-pointed-dripstone/HappyPointedDripstone.vue'))}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
