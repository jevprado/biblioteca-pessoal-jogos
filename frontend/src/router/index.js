import { createRouter, createWebHistory } from 'vue-router';
import HomePageView from '../views/HomePageView.vue';
import GamesView from '../views/GamesView.vue';
import GameDetailView from '../views/GameDetailView.vue';
import UserLibraryView from '../views/UserLibraryView.vue';
import GamesAddView from '../views/GamesAddView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' }, // Redireciona qualquer rota desconhecida para a página inicial
    { path: '/home', name: 'home', component: HomePageView },
    { path: '/games', name: 'games', component: GamesView },
    { path: '/games/:id', name: 'game-detail', component: GameDetailView },
    { path: '/library', name: 'library', component: UserLibraryView },
    { path: '/gamesadd', redirect: '/games-add', component: GamesAddView }, 
  ],
});

export default router;