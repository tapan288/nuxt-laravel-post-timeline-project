<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import PostItem from "./PostItem.vue";

const { fetchPosts, posts, fetchNextPosts, isLoaded } = usePost();
const postStore = usePostStore();

onMounted(async () => {
  await postStore.fetchPosts();
});

const target = ref(null);

const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && postStore.isLoaded) {
    postStore.fetchNextPosts();
  }
});
</script>

<template>
  <div class="space-y-8">
    <PostItem v-for="post in postStore.posts" :key="post.id" :post="post" />
    <div ref="target" class="-translate-y-20"></div>
  </div>
</template>
