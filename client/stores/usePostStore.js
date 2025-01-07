export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]),
    page = ref(1),
    isLoaded = ref(false),
    createErrors = ref({});
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

  const storePost = async (form) => {
    try {
      const response = await sanctumFetch("/api/posts", {
        method: "POST",
        body: form,
      });

      posts.value = [response, ...posts.value];
    } catch (error) {
      if (error.statusCode === 422) {
        createErrors.value = error.data.errors;
      }
    }
  };

  return {
    posts,
    fetchPosts,
    fetchNextPosts,
    isLoaded,
    storePost,
    createErrors,
  };
});
