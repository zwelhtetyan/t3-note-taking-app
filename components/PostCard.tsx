'use client';

import { useRouter } from 'next/navigation';

interface PostCardProps {
  title: string;
  id: number;
}

export default function PostCard({ id, title }: PostCardProps) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/post?id=${id}`, {
      method: 'DELETE',
    });

    const message = await res.json();

    router.refresh();

    console.log(message);
  };

  return (
    <div className='flex items-center mb-2'>
      <h2 className='text-blue-700'>{title}</h2>

      <button
        onClick={() => handleDelete(id)}
        className='ml-4 py-1 text-white text-sm px-2 rounded bg-blue-500'
      >
        delete
      </button>
    </div>
  );
}
