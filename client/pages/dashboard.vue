<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Dashboard",
});

onMounted(() => {
  Echo.private("privateChannel").listen("PrivateEventExample", (e) => {
    console.log(e);
  });
});
</script>

<template>
  <div>Dashboard</div>
</template>
