import User from '@/components/User';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getServerSession(authOptions);

  console.log('user is : ', user);

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <main className='p-8'>
      <div>
        <h1 className='text-lg mb-5'>Hello from home page</h1>

        {user && <User />}
      </div>
    </main>
  );
}
