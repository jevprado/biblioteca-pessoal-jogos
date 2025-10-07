<script setup></script>

<template>
  <nav style="padding: 8px; display: flex; gap: 12px; border-bottom: 1px solid #ddd;">
    <router-link to="/home">Home</router-link>
    <router-link to="/games">Jogos</router-link>
    <router-link to="/library">Biblioteca</router-link>
  </nav>
  <router-view />
</template>