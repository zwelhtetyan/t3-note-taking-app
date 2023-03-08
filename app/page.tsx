import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <main className='p-8'>
      <h1 className='text-lg mb-5'>Hello from home page</h1>
    </main>
  );
}
