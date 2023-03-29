import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import Moment from "react-moment";
import defaultAvatar from "~/assets/images/default_profile.webp";
import useGetPosts from "~/hooks/useGetPosts";
import { axiosInstance } from "~/lib/axiosInstance";
import type { Post } from "~/types";

const PostCard = ({ ...post }: Post) => {
  const { data } = useSession();
  const { mutate: mutatePosts } = useGetPosts();
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

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

        {/* ••• */}
      </header>

      <div className="mt-2 ml-12">{post.content}</div>
    </div>
  );
};

export default PostCard;
