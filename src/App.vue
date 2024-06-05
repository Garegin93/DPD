<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.container {
  width: 100%;
  max-width: 1380px;
  padding: 60px 0;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
