<script setup>
import { ref, onMounted, computed } from 'vue';
import { api } from '../services/api';

const games = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const form = ref({ title: '', platform: '', developer: '', releaseYear: '', coverUrl: '' });

const loadGames = async () => {
  loading.value = true;
  const { data } = await api.get('/games');
  games.value = data;
  loading.value = false;
};

const addGame = async () => {
  if (!form.value.title || !form.value.platform) return; /*campos obrigatórios*/
  await api.post('/games', {
    title: form.value.title,
    platform: form.value.platform,
    developer: form.value.developer || null,
    releaseYear: form.value.releaseYear ? Number(form.value.releaseYear) : null,
  });
  form.value = { title: '', platform: '', developer: '', releaseYear: '', coverUrl: '' };
  await loadGames();
};

// Computed property - para filtrar jogos baseado na pesquisa
const filteredGames = computed(() => {
  if (!searchQuery.value) {
    return games.value;
  }
  
  const query = searchQuery.value.toLowerCase();
  return games.value.filter(game => 
    game.title.toLowerCase().includes(query) ||
    game.platform.toLowerCase().includes(query) ||
    (game.developer && game.developer.toLowerCase().includes(query)) ||
    (game.releaseYear && game.releaseYear.toString().includes(query))
  );
});

onMounted(loadGames);
</script>

<template>
  <div class="view-page">
    <h1>Jogos</h1>
    
    <!-- Barra de pesquisa -->
    <div class="search-container">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Pesquisar jogos por título, plataforma, desenvolvedor ou ano..."
        class="search-input"
      />
    </div>
    
    <div v-if="loading">Carregando...</div>

    <ul v-else class="games-list">
      <li v-for="g in filteredGames" :key="g.id">
        <router-link :to="`/games/${g.id}`" style="text-decoration: none; color: white;">
          <strong>{{ g.title }}</strong> — {{ g.platform }}
          <span v-if="g.releaseYear"> ({{ g.releaseYear }})</span>
        </router-link>
      </li>
    </ul>
    
    <!-- Mensagem quando não há resultados -->
    <div v-if="!loading && filteredGames.length === 0 && searchQuery" class="no-results">
      Nenhum jogo encontrado para "{{ searchQuery }}"
    </div>
  </div>

    <div class="container-btn">
      <button @click="router.back()" class="btn-biblioteca-add">Acessar sua biblioteca</button>
    </div>
</template>

<style src="./GamesView.css" scoped></style>