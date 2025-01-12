<script setup type="module">
import { useIntersectionObserver } from "@vueuse/core";
import PostItem from "./PostItem.vue";

const postStore = usePostStore();

onMounted(async () => {
  await postStore.fetchPosts();
});

const target = ref(null);

onMounted(() => {
  Echo.channel("posts")
    .listen("PostCreated", (post) => {
      postStore.pushPost(post);
    })
    .listen("PostDeleted", (event) => {
      postStore.removePost(event.postId);
    })
    .listen("PostUpdated", (post) => {
      postStore.syncPost(post);
    });
});

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
