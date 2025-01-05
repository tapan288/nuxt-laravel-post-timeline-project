export const usePost = () => {
  const posts = ref({});
  const sanctumFetch = useSanctumClient();

  const fetchPosts = async () => {
    try {
      const response = await sanctumFetch("/api/posts");

      posts.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { posts, fetchPosts };
};
