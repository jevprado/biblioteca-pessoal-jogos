<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../services/api';

const games = ref([]);
const loading = ref(false);
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

onMounted(loadGames);
</script>

<template>
  <div class="page">
    <h1>Jogos</h1>

    <form @submit.prevent="addGame" style="margin-bottom: 16px;">
      <input v-model="form.title" placeholder="Título" required />

      <select v-model="form.platform" required>
        <option value="" disabled selected>Selecione a plataforma</option>
        <option value="Steam">Steam</option>
        <option value="Xbox PC">Xbox PC</option>
        <option value="Epic Games">Epic Games</option>
        <option value="Steam">Steam</option>
        <option value="GOG">GOG</option>
        <option value="Amazon Prime">Amazon Prime</option>
      </select>

      <input v-model="form.developer" placeholder="Desenvolvedora" />
      <input v-model="form.releaseYear" placeholder="Ano" type="number" />
      <button type="submit">Adicionar</button>
    </form>

    <div v-if="loading">Carregando...</div>
    <ul v-else>
      <li v-for="g in games" :key="g.id">
        <router-link :to="`/games/${g.id}`" style="text-decoration: none; color: inherit;">
          <strong>{{ g.title }}</strong> — {{ g.platform }}
          <span v-if="g.releaseYear"> ({{ g.releaseYear }})</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page { padding: 16px; }
input { margin-right: 8px; margin-bottom: 8px; }
</style>