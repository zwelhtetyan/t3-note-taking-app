'use client';

import { FormEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PostForm() {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();

    const title = titleInputRef.current?.value;

    if (!title?.trim().length) return;

    const res = await fetch(`/api/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const newPost = await res.json();

    router.refresh();

    console.log(newPost);
  };

  return (
    <form className='mb-10' onSubmit={handlePost}>
      <input
        ref={titleInputRef}
        placeholder='post title'
        type='text'
        className='block w-80 bg-gray-200 py-2 px-3 rounded-md focus:outline-blue-400'
      />

      <button className='mt-5 bg-blue-600 py-2 px-4 rounded-md text-white hover:bg-blue-700'>
        Post
      </button>
    </form>
  );
}
