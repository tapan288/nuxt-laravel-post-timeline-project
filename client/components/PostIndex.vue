<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import PostItem from "./PostItem.vue";

const { fetchPosts, posts, fetchNextPosts, isLoaded } = usePost();

onMounted(async () => {
  await fetchPosts();
});

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && isLoaded.value) {
    fetchNextPosts();
  }
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
    <div ref="target" class="-translate-y-20"></div>
  </div>
</template>
