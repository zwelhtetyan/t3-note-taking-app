import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Moment from "react-moment";
import defaultAvatar from "~/assets/images/default_profile.webp";
import useGetPosts from "~/hooks/useGetPosts";
import { axiosInstance } from "~/lib/axiosInstance";
import type { Post } from "~/types";

const ManageDropdown = ({
  handleDeletePost,
  deleting,
}: {
  handleDeletePost: () => void;
  deleting: boolean;
}) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu rounded-box absolute top-[35px] right-0 z-10 w-52 border bg-base-100 p-2 shadow dark:border-gray-700"
    >
      <li>
        <a>Edit</a>
      </li>
      <li onClick={handleDeletePost}>
        <a>{deleting ? "Deleting" : "Delete"}</a>
      </li>
    </ul>
  );
};

const PostCard = ({ ...post }: Post) => {
  const { data } = useSession();
  const { mutate: mutatePosts } = useGetPosts();
  const [showDropdown, setShowDropdown] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const isAuthor = useMemo(
    () => data?.user?.id === post.author?.id,
    [data?.user?.id, post.author?.id]
  );

  const handleDeletePost = async (
    postId: string,
    userId: string | undefined
  ) => {
    if (!postId || !userId) return;

    try {
      setDeleting(true);
      await axiosInstance.delete(`/posts/${postId}/?userId=${userId}`);
      void mutatePosts();
    } catch (error) {
      console.log(error);
    }

    setDeleting(false);
    closeDropdown();
  };

  // const handleEditPost = async (postId: string, userId: string | undefined) => {
  //   if (!postId || !userId) return;

  //   try {
  //     setEditing(true);
  //     await axiosInstance.put(`/posts/${postId}/?userId=${userId}`);
  //     void mutatePosts();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setEditing(false);
  // };

  return (
    <div className="mb-5 border-b pb-5 dark:border-gray-700">
      <header className="relative flex justify-between">
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

        {isAuthor && (
          <button
            onClick={toggleDropdown}
            className="btn-outline btn h-8 min-h-0 border-gray-300 p-2 text-neutral-500 hover:bg-neutral-500 dark:border-gray-600 dark:hover:bg-gray-500"
          >
            •••
          </button>
        )}

        {showDropdown && (
          <ManageDropdown
            handleDeletePost={() => handleDeletePost(post.id, post.author?.id)}
            deleting={deleting}
          />
        )}
      </header>

      <div className="mt-2 ml-12">{post.content}</div>

      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You have been selected for a chance to get one year of subscription
            to use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
