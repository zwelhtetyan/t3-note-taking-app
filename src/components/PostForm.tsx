import { type FormEvent, useState } from "react";

const PostForm = () => {
  const [content, setContent] = useState("");

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log("hi");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col items-center"
    >
      <input
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="What on your mind?"
        className="w-full rounded border border-blue-300 bg-gray-200 p-2 outline-none focus:border-blue-500"
      />

      <div className="mt-6 flex w-full">
        <div className="flex-1" />{" "}
        <button
          disabled={content.trim().length < 1}
          className="w-24 rounded-full bg-blue-300 p-2 hover:bg-blue-400 active:bg-blue-500 disabled:cursor-not-allowed"
        >
          Tweet
        </button>
      </div>
    </form>
  );
};

export default PostForm;
