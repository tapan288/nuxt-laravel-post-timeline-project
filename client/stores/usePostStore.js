export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]),
    page = ref(1),
    isLoaded = ref(false);
  const sanctumFetch = useSanctumClient();

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await sanctumFetch("/api/posts?page=" + pageNumber);

      posts.value = [...posts.value, ...response.data];
      page.value = response.meta.current_page;
      isLoaded.value = true;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPosts = async () => {
    fetchPosts(page.value + 1);
  };

  return { posts, fetchPosts, fetchNextPosts, isLoaded };
});
