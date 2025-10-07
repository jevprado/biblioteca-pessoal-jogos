<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../services/api';

const route = useRoute();
const router = useRouter();
const game = ref(null);
const loading = ref(false);
const error = ref('');

const loadGame = async () => {
  error.value = '';
  loading.value = true;
  try {
    const { data } = await api.get(`/games/${route.params.id}`);
    game.value = data;
  } catch (e) {
    error.value = e?.response?.data?.error || 'Jogo não encontrado';
  } finally {
    loading.value = false;
  }
};

onMounted(loadGame);
</script>

<template>
  <div class="page">
    <button @click="router.back()" style="margin-bottom: 12px;">Voltar</button>
    <h1>Detalhe do Jogo</h1>
    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="game">
      <h2>{{ game.title }}</h2>
      <p><strong>Plataforma:</strong> {{ game.platform }}</p>
      <p v-if="game.developer"><strong>Desenvolvedora:</strong> {{ game.developer }}</p>
      <p v-if="game.releaseYear"><strong>Ano:</strong> {{ game.releaseYear }}</p>
      <p v-if="game.coverUrl"><img :src="game.coverUrl" alt="Capa" style="max-height: 200px;" /></p>
    </div>
  </div>
  
</template>

<style scoped>
.page { padding: 12px; }
</style>


