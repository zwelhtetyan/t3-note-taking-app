import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import type { Post } from "~/types";
import PostCard from "./PostCard";

const PostContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading }: { data: Post[]; isLoading: boolean } = useSWR(
    "/posts",
    fetcher
  );

  console.log(data);

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
