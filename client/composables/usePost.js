export const usePost = () => {
  const posts = ref({}),
    page = ref("1");
  const sanctumFetch = useSanctumClient();

  const fetchPosts = async () => {
    try {
      const response = await sanctumFetch("/api/posts");

      posts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPosts = async (pageNumber = 2) => {
    try {
      const response = await sanctumFetch("/api/posts?page=" + pageNumber);

      posts.value = [...posts.value, ...response.data];
      page.value = response.meta.current_page;
    } catch (error) {
      console.log(error);
    }
  };

  return { posts, fetchPosts, fetchNextPosts };
};
