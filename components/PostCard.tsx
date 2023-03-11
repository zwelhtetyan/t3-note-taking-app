'use client';

import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
}

export default function PostCard({ id, title, content }: PostCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await axiosInstance.delete(`/post/delete?postId=${id}`);
    console.log('hi, successfully deleted');
    router.refresh();
  };

  const handleEdit = async () => {};

  return (
    <div className='mb-3 bg-gray-200 p-4 rounded'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <p>{content}</p>

      <div className='mt-5 space-x-2'>
        <button
          onClick={handleDelete}
          className='bg-red-500 py-1 px-2 rounded text-white'
        >
          delete
        </button>
        <button className='bg-blue-500 py-1 px-2 rounded text-white'>
          Edit
        </button>
      </div>
    </div>
  );
}
