<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../services/api';
import capaTeste from '../assets/capa-teste.jpg';

const route = useRoute();
const router = useRouter();
const game = ref(null);
const loading = ref(false);
const error = ref('');

</script>

<template>
  <div class="page">
    <h1 class="welcome-title">Bem-vindo à sua BIBLIOTECA DE JOGOS DIGITAIS</h1>
    <img :src="capaTeste" alt="Capa" class="welcome-image" />
    <button @click="router.back()" class="btn-biblioteca">Acessar sua biblioteca</button>
  </div>
  
</template>

<style src="./HomePageView.css" scoped></style>


