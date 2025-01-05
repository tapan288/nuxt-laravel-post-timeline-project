<script setup>
import PostItem from "./PostItem.vue";

const { fetchPosts, posts } = usePost();

onMounted(async () => {
  await fetchPosts();
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
