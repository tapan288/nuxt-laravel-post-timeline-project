<script setup lang="ts">
const route = useRoute();

useHead({
  title: <string>route.meta.title,
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
