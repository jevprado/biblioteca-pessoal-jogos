<script setup></script>

<template>
  <nav style="padding: 8px; display: flex; gap: 12px; background-color: #7700ffff; text-color: #ffffffff;">
    <router-link to="/home">Home</router-link>
    <router-link to="/games">Jogos</router-link>
    <router-link to="/library">Biblioteca</router-link>
  </nav>
  <router-view />
</template>