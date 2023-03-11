import { RefObject } from 'react';

interface Props {
  titleRef: RefObject<HTMLInputElement>;
  contentRef: RefObject<HTMLTextAreaElement>;
  handler: () => void;
}

export default function CreatePostForm({
  titleRef,
  contentRef,
  handler,
}: Props) {
  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h1 className='text-center text-xl text-blue-700 font-bold'>
        Create post
      </h1>

      <input
        ref={titleRef}
        type='text'
        placeholder='post title'
        className='w-full border p-2 border-blue-400 rounded-md mt-5'
      />

      <textarea
        ref={contentRef}
        placeholder='write your content here...'
        className='w-full border p-2 border-blue-400 rounded-md mt-5'
      />

      <button
        onClick={handler}
        className='bg-black block mx-auto mt-5 text-white py-2 px-3 rounded'
      >
        Post
      </button>
    </div>
  );
}
