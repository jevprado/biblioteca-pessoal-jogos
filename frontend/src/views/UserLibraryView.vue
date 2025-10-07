<script setup>
import { ref } from 'vue';
import { api } from '../services/api';

const userId = ref('');
const result = ref(null);
const error = ref('');

const loadLibrary = async () => {
  error.value = '';
  result.value = null;
  if (!userId.value) {
    error.value = 'Informe um userId';
    return;
  }
  try {
    const { data } = await api.get(`/users/${userId.value}/library`);
    result.value = data;
  } catch (e) {
    error.value = e?.response?.data?.error || 'Erro ao carregar biblioteca';
  }
};
</script>

<template>
  <div class="page">
    <h1>Biblioteca do Usuário</h1>
    <div style="margin-bottom: 12px;">
      <input v-model="userId" placeholder="User ID" />
      <button @click="loadLibrary">Buscar</button>
    </div>
    <div v-if="error" style="color: red;">{{ error }}</div>

    <ul v-if="Array.isArray(result)">
      <li v-for="g in result" :key="g.id">
        <strong>{{ g.title }}</strong> — {{ g.platform }}
        <em v-if="g.Library"> ({{ g.Library.status }}, {{ g.Library.hoursPlayed }}h)</em>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page { padding: 16px; }
</style>