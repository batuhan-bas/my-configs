<script setup lang="ts">
const save = async (): Promise<void> => {
  await Promise.resolve();
};

const onClick = (): void => {
  // Expected: @typescript-eslint/no-floating-promises (type-aware rule inside .vue)
  save();
};
</script>

<template>
  <button type="button" @click="onClick">Save</button>
</template>
