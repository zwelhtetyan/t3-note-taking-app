'use client';

import CreatePostForm from '@/components/CreatePostForm';
import { axiosInstance } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export interface PostData {
  title: string;
  content?: string;
  authorId: string;
}

export default function CreatePost() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const { data: user }: any = useSession();

  const handlePost = async () => {
    const newPost: PostData = {
      authorId: user.id,
      title: titleRef.current?.value!,
      content: contentRef.current?.value!,
    };

    await axiosInstance.post('/post/create', newPost);
    router.push('/');
  };

  return (
    <>
      <Link href='/' className='block bg-black text-white py-2 px-3 rounded'>
        go back home
      </Link>
      <CreatePostForm
        titleRef={titleRef}
        contentRef={contentRef}
        handler={handlePost}
      />
    </>
  );
}
