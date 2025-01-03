<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Dashboard",
});

onMounted(() => {
  Echo.channel("posts").listen("ExampleEvent", (e) => {
    console.log(e);
  });
});
</script>

<template>
  <div>Dashboard</div>
</template>
