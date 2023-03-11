import User from '@/components/User';
import { axiosInstance } from '@/lib/axios';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getAllPosts = async () => {
  const res = await fetch('http://localhost:3000/api/post/getAllPosts', {
    next: { revalidate: 10 },
  });
  return await res.json();
};

export default async function Home() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect('/auth/login');
  }

  const allPosts = await getAllPosts();
  console.log(allPosts);

  return (
    <main className='p-8'>
      <div>
        <h1 className='text-lg mb-5'>Hello from home page</h1>

        {user && <User />}

        <Link
          href='/create'
          className='inline-block mt-5 bg-black text-white py-2 px-3 rounded'
        >
          Create new post
        </Link>

        <div className='mt-10'>
          {allPosts?.map((post: any) => (
            <div key={post.id} className='mb-3 bg-gray-200 p-4 rounded'>
              <h1 className='text-xl font-bold'>{post.title}</h1>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
