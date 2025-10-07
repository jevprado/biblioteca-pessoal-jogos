import { createRouter, createWebHistory } from 'vue-router';
import GamesView from '../views/GamesView.vue';
import UserLibraryView from '../views/UserLibraryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/games' },
    { path: '/games', name: 'games', component: GamesView },
    { path: '/library', name: 'library', component: UserLibraryView },
  ],
});

export default router;