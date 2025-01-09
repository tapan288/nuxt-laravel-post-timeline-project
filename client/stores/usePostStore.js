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

  const pushPost = (post) => {
    if (posts.value.find((item) => item.id == post.id)) {
      return;
    }

    posts.value = [post, ...posts.value];
  };

  const fetchNextPosts = async () => {
    fetchPosts(page.value + 1);
  };

  const storePost = async (form) => {
    try {
      const response = await sanctumFetch("/api/posts", {
        method: "POST",
        headers: {
          "X-Socket-Id": Echo.socketId(),
        },
        body: form,
      });

      pushPost(response);
    } catch (error) {
      if (error.statusCode === 422) {
        createErrors.value = error.data.errors;
      }
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await sanctumFetch("/api/posts/" + postId, {
        method: "DELETE",
        headers: {
          "X-Socket-Id": Echo.socketId(),
        },
      });

      removePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const removePost = (postId) => {
    posts.value = posts.value.filter((post) => post.id != postId);
  };

  return {
    posts,
    fetchPosts,
    fetchNextPosts,
    isLoaded,
    storePost,
    createErrors,
    pushPost,
    deletePost,
    removePost,
  };
});
