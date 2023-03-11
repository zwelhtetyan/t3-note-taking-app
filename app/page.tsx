import PostCard from '@/components/PostCard';
import User from '@/components/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import next from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getAllPosts = async () => {
  const res = await fetch('http://localhost:3000/api/post/getAllPosts', {next: {revalidate: 10}});
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
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
