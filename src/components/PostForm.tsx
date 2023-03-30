import { type FormEvent, useState } from "react";
import useGetPosts from "~/hooks/useGetPosts";
import { axiosInstance } from "~/lib/axiosInstance";

const PostForm = () => {
  const [content, setContent] = useState("");
  const { mutate: mutatePosts } = useGetPosts();
  const [posting, setPosting] = useState(false);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setPosting(true);

    try {
      await axiosInstance.post("/posts/create", { content });
      void mutatePosts();
      setContent("");
    } catch (err) {
      console.log(err);
    }

    setPosting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-5 flex w-full max-w-md flex-col items-center"
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="What's on your mind ?"
        className="input-primary"
      />

      <div className="mt-6 flex w-full">
        <div className="flex-1" />{" "}
        <button
          disabled={posting || content.trim().length < 1}
          className="btn-primary"
        >
          {posting ? "Tweeting..." : "Tweet"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
