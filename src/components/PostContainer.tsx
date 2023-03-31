import useGetPosts from "~/hooks/useGetPosts";
import PostCard from "./PostCard";
import { socket } from "~/pages/index";
import { useEffect } from "react";
import type { Post } from "~/types";

const PostContainer = () => {
  const { data, isLoading, mutate } = useGetPosts();

  useEffect(() => {
    if (socket) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      socket.on("newPost", (newPost: Post) => mutate([...data, newPost]));
    }
  }, [data, mutate]);

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
