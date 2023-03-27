import useGetPosts from "~/hooks/useGetPosts";
import PostCard from "./PostCard";

const PostContainer = () => {
  const { data, isLoading } = useGetPosts();

  return (
    <div className="mx-auto mt-5 w-full max-w-lg">
      {isLoading && <p>Loading...</p>}
      {data?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostContainer;
