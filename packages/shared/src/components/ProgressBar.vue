<script setup lang="ts">
defineProps<{ progress: number }>()
</script>

<template>
  <div class="reading-bar" :style="{ width: progress + '%' }" />
</template>
