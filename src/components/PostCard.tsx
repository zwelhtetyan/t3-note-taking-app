import Image from "next/image";
import Moment from "react-moment";
import defaultAvatar from "~/assets/images/default_profile.webp";
import type { Post } from "~/types";

const PostCard = ({ ...post }: Post) => {
  return (
    <div className="mb-5 border-b pb-5 dark:border-gray-700">
      <header className="flex justify-between">
        <div className="flex items-center">
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
        </div>

        <div className="dropdown-left dropdown">
          <button className="btn-outline btn h-8 min-h-0 border-gray-300 p-2 text-neutral-500 hover:bg-neutral-500 dark:border-gray-600 dark:hover:bg-gray-500">
            •••
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 border bg-base-100 p-2 shadow dark:border-gray-700"
          >
            <li>
              <a>Edit</a>
            </li>
            <li>
              <a>Delete</a>
            </li>
          </ul>
        </div>
      </header>

      <div className="mt-2 ml-12">{post.content}</div>
    </div>
  );
};

export default PostCard;
