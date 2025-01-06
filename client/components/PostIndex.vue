<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import PostItem from "./PostItem.vue";

const { fetchPosts, posts, fetchNextPosts } = usePost();

onMounted(async () => {
  await fetchPosts();
});

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      fetchNextPosts();
    }
  }
);
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
    <div ref="target" class="-translate-y-20"></div>
  </div>
</template>
