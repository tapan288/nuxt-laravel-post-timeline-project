export const usePost = () => {
  const posts = ref([]),
    page = ref("1");
  const sanctumFetch = useSanctumClient();

  const fetchPosts = async (pageNumber = 1) => {
    try {
      const response = await sanctumFetch("/api/posts?page=" + pageNumber);

      posts.value = [...posts.value, ...response.data];
      page.value = response.meta.current_page;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPosts = async () => {
    fetchPosts(page.value + 1);
  };

  return { posts, fetchPosts, fetchNextPosts };
};
