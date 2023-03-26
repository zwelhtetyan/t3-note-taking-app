import Image from "next/image";
import Moment from "react-moment";
import defaultAvatar from "~/assets/images/default_profile.webp";
import type { Post } from "~/types";

const PostCard = ({ ...post }: Post) => {
  const d = post.createdAt.slice(0, 10);

  return (
    <div className="mb-5 border-b pb-5">
      <header className="flex items-center">
        <Image
          width={100}
          height={100}
          src={post.author?.image || defaultAvatar}
          alt="user profile"
          className="mr-2 h-10 w-10 rounded-full"
        />

        <div>
          <h3>{post.author?.name}</h3>
          <p className="text-sm leading-4 text-neutral-500">
            <Moment fromNow>{post.createdAt}</Moment>
          </p>
        </div>
      </header>

      <div className="mt-2 ml-12">{post.content}</div>
    </div>
  );
};

export default PostCard;
