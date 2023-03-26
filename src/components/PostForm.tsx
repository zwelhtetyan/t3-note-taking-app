import { type FormEvent, useState } from "react";
import { axiosInstance } from "~/lib/axiosInstance";

const PostForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await axiosInstance.post("/posts/create", { content });

    setContent("");
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
        placeholder="What on your mind?"
        className="w-full rounded border border-blue-300 bg-gray-200 p-2 outline-none focus:border-blue-500"
      />

      <div className="mt-6 flex w-full">
        <div className="flex-1" />{" "}
        <button
          disabled={content.trim().length < 1}
          className="w-24 rounded-full bg-blue-300 p-2 transition-all hover:bg-blue-400 active:bg-blue-500 disabled:cursor-not-allowed"
        >
          Tweet
        </button>
      </div>
    </form>
  );
};

export default PostForm;
