export const usePostStore = defineStore("postStore", () => {
  const posts = ref([]),
    page = ref(1),
    isLoaded = ref(false),
    createErrors = ref({}),
    updateErrors = ref({});
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

  const updatePost = async (postId, formData) => {
    try {
      const response = await sanctumFetch("/api/posts/" + postId, {
        method: "PUT",
        body: formData,
        headers: {
          "X-Socket-Id": Echo.socketId(),
        },
      });

      syncPost(response);

      return response;
    } catch (error) {
      if (error.statusCode === 422) {
        updateErrors.value = error.data.errors;
      }

      return Promise.reject(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await sanctumFetch("/api/posts/" + postId + "/like", {
        method: "POST",
        headers: {
          "X-Socket-Id": Echo.socketId(),
        },
      });

      syncLikes(response);

      return response;
    } catch (error) {
      return Promise.reject(error);
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

  const syncPost = (post) => {
    const postInStore = posts.value.find((item) => item.id == post.id);
    postInStore.body = post.body;
    // postInStore.title = post.title;
  };

  const syncLikes = (post) => {
    const postInStore = posts.value.find((item) => item.id == post.id);
    postInStore.likes = post.likes;
  };

  return {
    posts,
    fetchPosts,
    fetchNextPosts,
    isLoaded,
    storePost,
    createErrors,
    updateErrors,
    pushPost,
    deletePost,
    removePost,
    updatePost,
    syncPost,
    likePost,
    syncLikes,
  };
});
