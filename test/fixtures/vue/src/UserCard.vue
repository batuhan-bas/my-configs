<script setup lang="ts">
defineProps<{ names: string[] }>();
</script>

<template>
  <ul>
    <!-- Expected: vue/require-v-for-key -->
    <li v-for="name in names">{{ name }}</li>
  </ul>
</template>
